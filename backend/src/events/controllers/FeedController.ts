import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FeedService } from '../services/FeedService';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  myfeed(@Request() req: any) {
    return this.feedService.myFeed(req);
  }
}
