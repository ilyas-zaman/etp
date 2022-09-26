import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-strategy';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/services/UserService';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
