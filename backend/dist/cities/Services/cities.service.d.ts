import { Model } from 'mongoose';
import { CityDto } from '../dto/CityDto';
import { City } from '../schema/CitySchema';
export declare class CitiesService {
    private readonly cityModel;
    constructor(cityModel: Model<City>);
    createCity(cityDto: CityDto): Promise<void>;
    getAllCities(): Promise<(City & {
        _id: any;
    })[]>;
    getCityById(id: string): Promise<City & {
        _id: any;
    }>;
}
