import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserLoginDto } from '../dto/user.login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userLogin: UserLoginDto): Promise<any> {}
}
