import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  readonly password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly username: string;
}
