import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CityDto } from '../dto/CityDto';
import { CitiesService } from '../Services/cities.service';
@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(readonly citiesService: CitiesService) {}

  @Get(':id')
  getCityById(@Param('id') id: string) {
    return this.citiesService.getCityById(id);
  }

  @Post()
  createCity(@Body() cityDto: CityDto) {
    return this.citiesService.createCity(cityDto);
  }
  @Get()
  getAllCities() {
    return this.citiesService.getAllCities();
  }
}
