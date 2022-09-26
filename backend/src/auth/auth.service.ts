import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/UserService';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema/UserSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLoginDto } from './dto/user.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userLogin: UserLoginDto) {
    await this.userService.getUserByUsername(userLogin.username);
  }

  async login(user: UserLoginDto) {
    const findUsername = await this.userService.getUserByUsername(
      user.username,
    );

    const passwoordMatch = await bcrypt.compare(
      user.password,
      findUsername.password,
    );
    if (!passwoordMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { username: user.username, sub: findUsername._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
