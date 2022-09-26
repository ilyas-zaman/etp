import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly username: string;
}
