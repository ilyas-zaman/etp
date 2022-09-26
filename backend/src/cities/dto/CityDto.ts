import { IsString, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
