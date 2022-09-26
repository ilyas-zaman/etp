import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CityDto } from '../dto/CityDto';
import { City } from '../schema/CitySchema';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<City>,
  ) {}
  async createCity(cityDto: CityDto) {
    const city = await new this.cityModel(cityDto);
    city.save();
  }

  async getAllCities() {
    const cities = await this.cityModel.find();
    return cities;
  }
  async getCityById(id: string) {
    const city = await this.cityModel.findById({ _id: id });
    console.log(city);

    return city;
  }
}
