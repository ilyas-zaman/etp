"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UserModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const UserService_1 = require("./services/UserService");
const UserController_1 = require("./controllers/UserController");
const UserSchema_1 = require("./schema/UserSchema");
const EventSchema_1 = require("../events/schema/EventSchema");
const mongoose_1 = require("@nestjs/mongoose");
const EventService_1 = require("../events/services/EventService");
const FollowService_1 = require("./services/FollowService");
const FollowController_1 = require("./controllers/FollowController");
let UserModule = UserModule_1 = class UserModule {
};
UserModule = UserModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: UserSchema_1.User.name, schema: UserSchema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: EventSchema_1.Event.name, schema: EventSchema_1.EventSchema }]),
        ],
        providers: [UserService_1.UserService, EventService_1.EventsService, FollowService_1.FollowService],
        controllers: [UserController_1.UserController, FollowController_1.FollowController],
        exports: [UserService_1.UserService, UserModule_1, FollowService_1.FollowService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map