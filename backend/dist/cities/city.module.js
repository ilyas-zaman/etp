"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const EventSchema_1 = require("../events/schema/EventSchema");
const cities_controller_1 = require("./Controllers/cities.controller");
const CitySchema_1 = require("./schema/CitySchema");
const cities_service_1 = require("./Services/cities.service");
let CitiesModule = class CitiesModule {
};
CitiesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: CitySchema_1.City.name, schema: CitySchema_1.CitySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Event.name, schema: EventSchema_1.EventSchema }]),
        ],
        controllers: [cities_controller_1.CitiesController],
        providers: [cities_service_1.CitiesService],
        exports: [cities_service_1.CitiesService],
    })
], CitiesModule);
exports.CitiesModule = CitiesModule;
//# sourceMappingURL=city.module.js.map