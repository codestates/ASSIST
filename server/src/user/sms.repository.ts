import { Sms_auth } from 'src/others/sms_auth.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSMSAuth } from './dto/create-dto';

@EntityRepository(Sms_auth)
export class SmsRepository extends Repository<Sms_auth> {
  async createSms(createSMSAuth: CreateSMSAuth): Promise<object> {
    const { phone } = createSMSAuth;
    this.delete({ phone });
    const sms = this.create(createSMSAuth);
    await this.save(sms);
    return { message: 'ok' };
  }

  async findSms(createSMSAuth: CreateSMSAuth): Promise<Sms_auth | void> {
    const sms: Sms_auth | null = await this.findOne({ where: createSMSAuth });
    return sms;
  }
}
