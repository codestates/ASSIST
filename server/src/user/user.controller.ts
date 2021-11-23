import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSMSAuth, CreateUserDto } from './dto/create-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Post('/signup')
  // signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
  //   console.log(createUserDto);
  //   return this.userService.signUp(createUserDto);
  // }

  @Post('/smsauth')
  async getAuthNum(@Body('phone') phone: string): Promise<object> {
    console.log(phone);
    await this.userService.sendAuthNum(phone);
    return { message: 'ok' };
  }

  @Post('/smsauth/verify')
  async verifyAuthNum(@Body() createSMSAuth: CreateSMSAuth): Promise<object> {
    const sms = await this.userService.verifyAuthNum(createSMSAuth);
    return { message: '인증에 성공하였습니다.' };
  }
}
