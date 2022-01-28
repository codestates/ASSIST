import * as CryptoJS from 'crypto-js';
import axios from 'axios';
import { InternalServerErrorException } from '@nestjs/common';
import { AlimtalkDto } from './dto/sendTalk.dto';
import { AlimTalkMessageRequest } from './interface/alimtalk_message';

export class NaverSensService {
  async sendSMS(phone: string, content: string, type = 'SMS'): Promise<void> {
    phone = phone.replace(/-/g, '');
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SMS_SERVICEID}/messages`;
    const body = {
      type,
      contentType: 'COMM',
      countryCode: '82',
      from: process.env.HOST_PHONE, // 발신자 번호
      content,
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

  async sendGroupSMS(arr) {
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SMS_SERVICEID}/messages`;
    const body = {
      type: 'LMS',
      contentType: 'COMM',
      countryCode: '82',
      content: '테스트',
      from: process.env.HOST_PHONE, // 발신자 번호
      messages: arr,
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
        console.log(`${body.messages?.length}명에게 문자보내기 성공`);
      })
      .catch((err) => {
        console.error(err.response.data);
        throw new InternalServerErrorException('문자보내기 실패');
      });
  }

  async sendKakaoAlarm(code: string, infoArr: AlimtalkDto[]): Promise<void> {
    const url = `https://sens.apigw.ntruss.com/alimtalk/v2/services/${process.env.KAKAOBIZ_SERVICEID}/messages`;

    const payload = [];

    infoArr.forEach((el) => {
      el.to = el.to.replace(/-/g, '');
      payload.push(el);
    });

    payload.forEach((el) => {
      console.log(el);
    });
    const body: AlimTalkMessageRequest = {
      templateCode: code,
      plusFriendId: '@assist',
      messages: payload,
    };

    const options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': process.env.NCP_ACCESS,
        'x-ncp-apigw-timestamp': Date.now().toString(),
        'x-ncp-apigw-signature-v2': this.makeSignature('biz'),
      },
    };

    axios
      .post(url, body, options)
      .then(async (res) => {
        console.log(`${res.data.messages.length} 개의 메세지`);
        console.log(`알람톡 보내기 성공`);
      })
      .catch((err) => {
        console.log('알람톡보내기 실패 ', err.response);
      });

    return;
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
}
