import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FollowService } from '../services/FollowService';
import { UserService } from '../services/UserService';

@ApiTags('users')
@Controller('users')
export class FollowController {
  constructor(
    private userService: UserService,
    private followService: FollowService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/follow/:username')
  public async followUser(@Request() req, @Param('username') username: string) {
    return await this.followService.follow(req, username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/unfollow/:username')
  public async unfollowUser(
    @Request() req,
    @Param('username') username: string,
  ) {
    return await this.followService.unfollow(req, username);
  }
}
