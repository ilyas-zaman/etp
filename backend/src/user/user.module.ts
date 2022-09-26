import { Module } from '@nestjs/common';
import { UserService } from './services/UserService';
import { UserController } from './controllers/UserController';
import { User, UserSchema } from './schema/UserSchema';
import { Event, EventSchema } from '../events/schema/EventSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from 'src/events/services/EventService';
import { FollowService } from './services/FollowService';
import { FollowController } from './controllers/FollowController';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [UserService, EventsService, FollowService],
  controllers: [UserController, FollowController],
  exports: [UserService, UserModule, FollowService],
})
export class UserModule {}
