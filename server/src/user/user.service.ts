import {
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
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SmsRepository) private smsRepository: SmsRepository,
    private jwtService: JwtService,
  ) {}

  async sendSMS(phone: string, content: string): Promise<void> {
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

  async signUp(createUserDto: CreateUserDto): Promise<object> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password, provider } = signInDto;
    const user = await this.userRepository.findOne({ email, provider });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { ...user };
      delete payload.password;
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async getUser(user: User) {
    let found = await this.userRepository.findOne(
      { id: user.id },
      { relations: ['teams'] },
    );
    delete found.password;

    return found;
  }

  async patchUser(updateInfo: UpdateDto, userInfo: User): Promise<object> {
    let { password } = updateInfo;
    const { id } = userInfo;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      updateInfo.password = password;
    }
    let user = await this.userRepository.findOne({ id });
    Object.keys(updateInfo).forEach((el) => {
      user[el] = updateInfo[el];
    });
    await this.userRepository.save(user);
    const payload = { ...user };
    delete payload.password;
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async checkPw(userInfo: User, password: string): Promise<object> {
    const { id } = userInfo;
    let user = await this.userRepository.findOne({ id });
    if (user && (await bcrypt.compare(password, user.password))) {
      return { message: 'ok' };
    } else {
      throw new UnauthorizedException();
    }
  }

  async deleteUser(userInfo: User) {
    const { id } = userInfo;
    await this.userRepository.delete({ id });
    return { message: 'ok' };
  }
  async quitTeam(id: number, userInfo: User): Promise<object> {
    let user = await this.userRepository.findOne(
      { id: userInfo.id },
      { relations: ['teams'] },
    );
    if (user.teams) {
      user.teams = user.teams.filter((el) => el.id !== id);
    }
    await this.userRepository.save(user);

    return { message: '완료 되었습니다.' };
  }

  private makeSignature(): string {
    const date = Date.now().toString();
    const secretKey = process.env.NCP_SECRET;
    const accessKey = process.env.NCP_ACCESS;
    const serviceId = process.env.SMS_SERVICEID;
    const method = 'POST';
    const space = ' ';
    const newLine = '\n';
    const url2 = `/sms/v2/services/${serviceId}/messages`;
    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();
    const signature = hash.toString(CryptoJS.enc.Base64);

    return signature;
  }
}
