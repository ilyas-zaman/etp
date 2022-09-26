import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user.login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: UserLoginDto) {
    return await this.authService.login(user);
  }
}
