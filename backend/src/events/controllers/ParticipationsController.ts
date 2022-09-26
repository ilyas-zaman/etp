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
import { ParticipationsService } from '../services/ParticipationsService';
@ApiTags('events')
@Controller('events')
export class ParticipationsController {
  constructor(private participationsService: ParticipationsService) {}

  @Get(':id/participants')
  getEventParticipants(@Param('id') id: string) {
    return this.participationsService.getParticipantsByEvents(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':id/participate')
  participateEvent(@Param('id') id: string, @Request() req: any) {
    return this.participationsService.participateEvent(id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/boycott')
  boycottEvent(@Param('id') id: string, @Request() req: any) {
    return this.participationsService.boycottEvent(id, req);
  }
}
