import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from 'src/events/schema/EventSchema';
import { CategoriesController } from './Controllers/CategoriesController';
import { Category, CategorySchema } from './schema/CategorySchema';
import { CategoriesService } from './Services/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
