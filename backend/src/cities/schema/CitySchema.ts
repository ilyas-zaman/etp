import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class City extends Document {
  @Prop()
  name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
