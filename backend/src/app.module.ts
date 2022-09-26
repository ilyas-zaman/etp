import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { EventsModule } from './events/events.module';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

import { CitiesModule } from './cities/city.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://root:password@localhost:27017/etp'),
    AuthModule,
    EventsModule,
    UserModule,
    CategoriesModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
