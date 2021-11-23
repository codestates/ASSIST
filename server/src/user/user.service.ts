import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSMSAuth, CreateUserDto } from './dto/create-dto';
import { UserRepository } from './user.repository';

import axios from 'axios';
import * as CryptoJS from 'crypto-js';
import { SmsRepository } from './sms.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(SmsRepository) private smsRepository: SmsRepository,
  ) {}

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
    try {
      await this.sendSMS(phone, number);
    } catch {
      return;
    }
    await this.smsRepository.createSms({ phone, number });
  }

  async verifyAuthNum(createSMSAuth: CreateSMSAuth) {
    const found = await this.smsRepository.findSms(createSMSAuth);

    if (!found) {
      throw new NotFoundException('입력하신 인증번호가 올바르지 않습니다.');
    }
    return found;
  }
  // signOut() {}
  // signIn() {}
  // async signUp(createUserDto: CreateUserDto): Promise<void> {
  //   return this.userRepository.createUser(createUserDto);
  // }
}
