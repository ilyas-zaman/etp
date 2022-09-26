import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/UserSchema';
import { EventsController } from './controllers/EventsController';
import { ParticipationsController } from './controllers/ParticipationsController';
import { LikesController } from './controllers/LikesController';
import { EventsService } from './services/EventService';
import { EventSchema } from './schema/EventSchema';
import { LikesService } from './services/LikesService';
import { ParticipationsService } from './services/ParticipationsService';
import { FeedController } from './controllers/FeedController';
import { FeedService } from './services/FeedService';
import { Category, CategorySchema } from 'src/categories/schema/CategorySchema';
import { City, CitySchema } from 'src/cities/schema/CitySchema';
import { UserService } from 'src/user/services/UserService';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  controllers: [
    EventsController,
    ParticipationsController,
    LikesController,
    FeedController,
  ],
  providers: [EventsService, LikesService, ParticipationsService, FeedService,UserService],
  exports: [EventsService, ParticipationsService, LikesService, FeedService],
})
export class EventsModule {}
