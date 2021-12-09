import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.ACCESS_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { email, provider } = payload;
    const user = await this.userRepository.findOne({ email, provider });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
