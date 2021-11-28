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
} from '@nestjs/common';
import { Request } from 'express';
import { CreateSMSAuth, CreateUserDto } from './dto/create-dto';
import { SignInDto } from './dto/signin-dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateDto } from './dto/update-dto';

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
  ): Promise<object> {
    const userInfo: User = req.user;
    return this.userService.patchUser(updateInfo, userInfo);
  }

  @Get('')
  @UseGuards(AuthGuard())
  async getUser(@Req() req: Request): Promise<any> {
    console.log(req.user);
    return this.userService.getUser(req.user);
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
    @Param('id') id: number,
    @Req() req: Request,
  ): Promise<object> {
    const userInfo = req.user;
    return this.userService.quitTeam(id, userInfo);
  }
}
