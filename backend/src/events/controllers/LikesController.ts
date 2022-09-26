import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LikesService } from '../services/LikesService';
@ApiTags('events')
@Controller('events')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  likeEvents(@Param('id') id: string, @Request() req: any) {
    return this.likesService.likeEvents(id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  removelikeEvents(@Param('id') id: string, @Request() req: any) {
    return this.likesService.removelikeEvents(id, req);
  }

  @Get(':id/like')
  getLikesByEvents(@Param('id') id: string) {
    return this.likesService.getLikesByEvents(id);
  }
}
