import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/UserSchema';
import { Category } from 'src/categories/schema/CategorySchema';
import { City } from 'src/cities/schema/CitySchema';

@Schema()
export class Event extends Document {
  @Prop()
  name: string;

  @Prop()
  beginingDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  planning: string;

  @Prop()
  adress: string;

  //   @Prop()
  //   price: string;

  @Prop({
    enum: ['private', 'public'],
  })
  confidentiality: string;

  @Prop()
  tag: string;

  @Prop()
  minimalAge: string;

  @Prop()
  seats: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category['_id'];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'City' })
  city: City['_id'];
  @Prop()
  userParticipant: [User];

  @Prop()
  userLike: [User];
}

export const EventSchema = SchemaFactory.createForClass(Event);
