import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSMSAuth, CreateUserDto } from './dto/create-dto';
import { SignInDto } from './dto/signin-dto';
import { UserRepository } from './user.repository';
import { SmsRepository } from './sms.repository';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdateDto } from './dto/update-dto';
import { User } from './user.entity';
import { PatchUser } from './interface/res.patchUser';
import { FindpwDto } from './dto/findpw-dto';
import { MatchRepository } from 'src/match/match.repository';
import { TeamRepository } from 'src/team/team.repository';
import { MakeT } from 'src/common/naver_sens/make_T_template';
import { NaverSensService } from 'src/common/naver_sens/sens.service';

@Injectable()
export class UserService {
  makeT = new MakeT();
  naverSensService = new NaverSensService();
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SmsRepository) private smsRepository: SmsRepository,
    private jwtService: JwtService,
    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,
  ) {}

  async sendSMS(phone: string, content: string): Promise<void> {
    phone = phone.replace(/-/g, '');
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SMS_SERVICEID}/messages`;
    const body = {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: process.env.HOST_PHONE, // 발신자 번호
      content: `인증번호 ${content} 입니다.`,
      messages: [
        {
          to: phone, // 수신자 번호
        },
      ],
    };
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': process.env.NCP_ACCESS,
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-apigw-signature-v2': this.makeSignature(),
      },
    };
    axios
      .post(url, body, options)
      .then(async (res) => {
        console.log(`${phone}에게 문자보내기 성공`);
      })
      .catch((err) => {
        console.error(err.response.data);
        throw new InternalServerErrorException('문자보내기 실패');
      });
  }
  async sendAuthNum(phone: string) {
    const number = String(Math.floor(Math.random() * 1000000));
    if (number.length !== 6) {
      return this.sendAuthNum(phone);
    }
    await this.sendSMS(phone, number);

    return await this.smsRepository.createSms({ phone, number });
  }

  async verifyAuthNum(createSMSAuth: CreateSMSAuth) {
    const found = await this.smsRepository.findSms(createSMSAuth);

    if (!found) {
      throw new NotFoundException('입력하신 인증번호가 올바르지 않습니다.');
    }
    return { message: '인증에 성공하였습니다.' };
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.createUser(createUserDto);
    const payload = { ...user };
    delete payload.password;
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password, provider } = signInDto;
    const user = await this.userRepository.findOne({
      email,
      provider,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 비밀번호 체크 후 유저 토큰 생성
      const payload = { ...user };
      delete payload.password;
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else if (user) {
      throw new UnauthorizedException('비밀번호가 잘못되었습니다.');
    } else {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }
  }

  async getUser(user: User) {
    delete user.password;
    return user;
  }

  async getUserTeam(user: User, option?) {
    const data: any = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'teams.id', 'teams.name', 'team.id', 'team.name'])
      .leftJoin('user.teams', 'teams')
      .leftJoin('user.team', 'team')
      .where('user.id = :id', { id: user.id })
      .getOne();

    if (!data) {
      throw new UnauthorizedException();
    }

    if (!data.teams.length) {
      return option
        ? {
            id: -1,
            name: '',
            leader: false,
            nextMatch: null,
          }
        : [];
    }

    if (data.team.length) {
      data.team.forEach((list: any) => {
        list.leader = true;
        data.teams = data.teams.filter((el) => el.id !== list.id);
      });
      data.teams = [...data.team, ...data.teams];
    }

    data.teams.forEach((el) => {
      if (!el.leader) el.leader = false;
      delete el.paymentDay, el.accountNumber, el.accountBank, el.dues, el.inviteCode;
    });

    if (option) {
      const nextMatch = await this.matchRepository.getNextMatch(data.teams[0].id, user);
      data.teams[0].nextMatch = nextMatch;
      return data.teams[0];
    }

    delete data.team;
    return data.teams;
  }

  async checkEmail(email: string): Promise<{ check: boolean }> {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!regExp.test(email)) {
      throw new BadRequestException('올바른 형식의 이메일 주소가 아닙니다.');
    }
    let payload = { check: true, name: null, phone: '' };
    const found = await this.userRepository.findOne({
      email,
      provider: 'normal',
    });
    console.log(found);
    if (found) {
      payload.check = false;
      payload.phone = found.phone;
      let blank = '';
      for (let i = 1; i < found.name.length - 1; i++) {
        blank += '*';
      }
      payload.name = found.name[0] + blank + found.name[found.name.length - 1];
    }

    return payload;
  }

  async patchUser(updateInfo: UpdateDto, userInfo: User): Promise<PatchUser> {
    let { password, phone } = updateInfo;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      updateInfo.password = password;
    }
    Object.keys(updateInfo).forEach((el) => {
      userInfo[el] = updateInfo[el];
    });
    // if (phone) await this.userRepository.deleteConflictPhone(phone);
    await this.userRepository.save(userInfo);

    delete userInfo.password;
    const payload = { ...userInfo };

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, user: userInfo };
  }

  async checkPw(userInfo: User, password: string): Promise<object> {
    const check: boolean = await bcrypt.compare(password, userInfo.password);

    if (!check) {
      throw new UnauthorizedException('잘못된 비밀번호 입니다.');
    }
    return { message: 'ok' };
  }

  async findPw(findpwDto: FindpwDto) {
    const { number, password, email } = findpwDto;

    const found = await this.smsRepository.findOne({ number });
    if (!found) {
      throw new NotFoundException('입력하신 인증번호가 올바르지 않습니다.');
    }

    const user = await this.userRepository.findOne({ phone: found.phone, email });
    if (!user) {
      throw new NotFoundException('잘못된 요청입니다. 인증을 다시해주세요.');
    }

    const salt: string = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await this.userRepository.save(user);

    const payload = { ...user };
    delete payload.password;

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async deleteUser(userInfo: User): Promise<Object> {
    const { id } = userInfo;
    await this.userRepository.delete({ id });
    return { message: 'ok' };
  }
  async quitTeam(id: number, userInfo: User): Promise<object> {
    const user = await this.userRepository.findOne(
      { id: userInfo.id },
      { relations: ['teams', 'teams.leaderId'] },
    );

    const index = user.teams.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException('해당 팀에 유저가 가입되어 있지 않습니다.');
    }
    const deleteTeam = user.teams.splice(index, 1)[0];

    let form = this.makeT.T006(user.leaderId.phone, {
      teamId: deleteTeam.id,
      team: deleteTeam.name,
      name: user.name,
    });
    await this.userRepository.save(user);
    this.naverSensService.sendKakaoAlarm('T006', [form]);
    return { message: '완료 되었습니다.' };
  }

  private makeSignature(type?: string): string {
    const date = Date.now().toString();
    const secretKey = process.env.NCP_SECRET;
    const accessKey = process.env.NCP_ACCESS;
    const method = 'POST';
    const space = ' ';
    const newLine = '\n';

    let serviceId = process.env.SMS_SERVICEID;
    let url = `/sms/v2/services/${serviceId}/messages`;
    if (type === 'biz') {
      serviceId = process.env.KAKAOBIZ_SERVICEID;
      url = `/alimtalk/v2/services/${serviceId}/messages`;
    }
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    return signature;
  }

  async kakaoAuthCallback(user): Promise<{ accessToken: string }> {
    try {
      const email = user.profile._json.kakao_account.email;
      const provider = 'kakao';
      const found = await this.userRepository.findOne({
        email,
        provider,
      });
      if (!found) {
        const name = user.profile._json.kakao_account.profile.nickname;
        const phone = '0' + user.profile._json.kakao_account.phone_number.split(' ')[1];
        const password = user.profile._json.id;
        const gender = '남성';
        return await this.signUp({
          email,
          name,
          phone,
          password,
          gender,
          provider,
        });
      } else {
        delete found.password;
        const payload = { ...found };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
      }
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async deleteKakaoLink(kakaoId: string): Promise<void> {
    const url = 'https://kapi.kakao.com/v1/user/unlink';
    const paramsString = `target_id_type=user_id&target_id=${kakaoId}`;
    const data = new URLSearchParams(paramsString);
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `KakaoAK ${process.env.KAKAO_ADMINKEY}`,
      },
    };
    await axios.post(url, data, options);
  }
}
