import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from 'src/user/services/UserService';
import { CreateEventDto } from '../dto/CreateEventDto';
import { UpdateEventDto } from '../dto/UpdateEventDto';
import { EventsService } from '../services/EventService';
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createEvent(
    @Body(ValidationPipe) createEventDto: CreateEventDto,
    @Request() req: any,
  ) {
    return this.eventsService.createEvent(createEventDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateEvent(
    @Param('id') id: string,
    @Body(ValidationPipe) updateEventDto: UpdateEventDto,
    @Request() req: any,
  ) {
    return this.eventsService.updateEvent(id, updateEventDto, req);
  }

  @Get(':id')
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEvent(@Param('id') id: any, @Request() req: any) {
    return this.eventsService.deleteEvent(id, req);
  }
  @Get()
  getEvents() {
    return this.eventsService.getEvents();
  }
  @Get('/category/:id')
  getEventsByCategory(@Param('id') id: string) {
    return this.eventsService.getEventsByCategory(id);
  }
  @Get('/city/:id')
  getEventsByCity(@Param('id') id: string) {
    return this.eventsService.getEventsByCity(id);
  }
  // @UseGuards(JwtAuthGuard)
  // @Get('/self')
  // getMyEvents(@Request() req:any)
  // {
  //   return this.eventsService.getMyEvents(req);
  // }
  @UseGuards(JwtAuthGuard)
  @Get('/created')
  public async getUserEvents(@Request() req: any) {
    return await this.userService.getEvents(req);
  }
}
