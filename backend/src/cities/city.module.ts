import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/events/schema/EventSchema';
import { CitiesController } from './Controllers/cities.controller';
import { City, CitySchema } from './schema/CitySchema';
import { CitiesService } from './Services/cities.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
