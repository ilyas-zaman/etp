import { CityDto } from '../dto/CityDto';
import { CitiesService } from '../Services/cities.service';
export declare class CitiesController {
    readonly citiesService: CitiesService;
    constructor(citiesService: CitiesService);
    getCityById(id: string): Promise<import("../schema/CitySchema").City & {
        _id: any;
    }>;
    createCity(cityDto: CityDto): Promise<void>;
    getAllCities(): Promise<(import("../schema/CitySchema").City & {
        _id: any;
    })[]>;
}
