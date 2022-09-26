import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  beginingDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  planning: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  adress: string;

  //   @ApiProperty()
  //   @IsString()
  //   @IsNotEmpty()
  //   price: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  confidentiality: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tag: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  minimalAge: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  seats: number;
  user: MongooseSchema.Types.ObjectId;
  @IsNotEmpty()
  category: MongooseSchema.Types.ObjectId;
  @IsNotEmpty()
  city: MongooseSchema.Types.ObjectId;
}
