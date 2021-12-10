import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
  Patch,
  Delete,
  Param,
  Res,
  Redirect,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateSMSAuth, CreateUserDto } from './dto/create-dto';
import { SignInDto } from './dto/signin-dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateDto } from './dto/update-dto';
import { PatchUser } from './interface/res.patchUser';
import { FindpwDto } from './dto/findpw-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<object> {
    console.log(createUserDto);
    return this.userService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.userService.signIn(signInDto);
  }

  @Post('/smsauth')
  async getAuthNum(@Body('phone') phone: string): Promise<object> {
    return this.userService.sendAuthNum(phone);
  }

  @Post('/smsauth/verify')
  async verifyAuthNum(@Body() createSMSAuth: CreateSMSAuth): Promise<object> {
    return await this.userService.verifyAuthNum(createSMSAuth);
  }

  @Patch('/')
  @UseGuards(AuthGuard())
  async patchUser(
    @Req() req: Request,
    @Body() updateInfo: UpdateDto,
  ): Promise<PatchUser> {
    const userInfo: User = req.user;
    return this.userService.patchUser(updateInfo, userInfo);
  }

  @Patch('/findpw')
  async findPw(@Body() findpwDto: FindpwDto) {
    return this.userService.findPw(findpwDto);
  }

  @Get('')
  @UseGuards(AuthGuard())
  async getUser(@Req() req: Request): Promise<any> {
    return this.userService.getUser(req.user);
  }

  @Get('/team')
  @UseGuards(AuthGuard())
  async getUserTeam(@Req() req: Request) {
    return await this.userService.getUserTeam(req.user);
  }

  @Get('/check')
  async checkEmail(@Query('email') email: string): Promise<{ check: boolean }> {
    return this.userService.checkEmail(email);
  }

  @Post('')
  @UseGuards(AuthGuard())
  async checkPw(
    @Req() req: Request,
    @Body('password') password: string,
  ): Promise<object> {
    const userInfo = req.user;
    return this.userService.checkPw(userInfo, password);
  }

  @Delete('')
  @UseGuards(AuthGuard())
  async deleteUser(@Req() req: Request) {
    const userInfo = req.user;
    return this.userService.deleteUser(userInfo);
  }

  @Delete('/team/:id')
  @UseGuards(AuthGuard())
  async quitTeam(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ): Promise<object> {
    const userInfo = req.user;
    return this.userService.quitTeam(id, userInfo);
  }

  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth(@Req() req) {
    console.log(req);
    return req;
  }

  @Get('/kakao/callback')
  @Redirect('http://localhost:3000', 302)
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req, @Res() res) {
    const { accessToken } = await this.userService.kakaoAuthCallback(req.user);
    return { url: `${process.env.HOMEPAGE_URL}/accessToken=${accessToken}` };
  }

  @Get('test')
  async test() {
    return this.userService.sendKakaoAlarm('01097784742');
  }
}
