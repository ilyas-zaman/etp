"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const UserSchema_1 = require("../user/schema/UserSchema");
const EventsController_1 = require("./controllers/EventsController");
const ParticipationsController_1 = require("./controllers/ParticipationsController");
const LikesController_1 = require("./controllers/LikesController");
const EventService_1 = require("./services/EventService");
const EventSchema_1 = require("./schema/EventSchema");
const LikesService_1 = require("./services/LikesService");
const ParticipationsService_1 = require("./services/ParticipationsService");
const FeedController_1 = require("./controllers/FeedController");
const FeedService_1 = require("./services/FeedService");
const CategorySchema_1 = require("../categories/schema/CategorySchema");
const CitySchema_1 = require("../cities/schema/CitySchema");
const UserService_1 = require("../user/services/UserService");
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: Event.name, schema: EventSchema_1.EventSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: CategorySchema_1.Category.name, schema: CategorySchema_1.CategorySchema },
            ]),
            mongoose_1.MongooseModule.forFeature([{ name: CitySchema_1.City.name, schema: CitySchema_1.CitySchema }]),
        ],
        controllers: [
            EventsController_1.EventsController,
            ParticipationsController_1.ParticipationsController,
            LikesController_1.LikesController,
            FeedController_1.FeedController,
        ],
        providers: [EventService_1.EventsService, LikesService_1.LikesService, ParticipationsService_1.ParticipationsService, FeedService_1.FeedService, UserService_1.UserService],
        exports: [EventService_1.EventsService, ParticipationsService_1.ParticipationsService, LikesService_1.LikesService, FeedService_1.FeedService],
    })
], EventsModule);
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map