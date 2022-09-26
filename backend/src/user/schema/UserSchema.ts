import { ApiProperty } from '@nestjs/swagger';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Exclude } from 'class-transformer';

@Schema()
export class User extends Document {
  @ApiProperty()
  @Prop()
  firstname: string;

  @ApiProperty()
  @Prop()
  lastname: string;

  @ApiProperty()
  @Prop({ unique: true })
  username: string;

  @ApiProperty()
  @Prop({ unique: true })
  email: string;

  @ApiProperty()
  @Prop()
  @Exclude()
  password: string;

  @ApiProperty()
  @Prop()
  events: [Event];

  @ApiProperty()
  @Prop()
  follow: [type: MongooseSchema.Types.ObjectId, ref: 'User'];

  @ApiProperty()
  @Prop()
  follower: [type: MongooseSchema.Types.ObjectId, ref: 'User'];

  @Prop()
  participations: [Event];

  @Prop()
  likes: [Event];
}

export const UserSchema = SchemaFactory.createForClass(User);
