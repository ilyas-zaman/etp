import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Schema as MongooseSchema } from 'mongoose';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEventDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  beginingDate: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  endDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  planning: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  adress: string;

  //   @ApiProperty()
  //   @IsString()
  //   @IsOptional()
  //   price: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  confidentiality: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  tag: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  minimalAge: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  seats: number;

  @IsOptional()
  category: MongooseSchema.Types.ObjectId;
  @IsOptional()
  city: MongooseSchema.Types.ObjectId;
}
