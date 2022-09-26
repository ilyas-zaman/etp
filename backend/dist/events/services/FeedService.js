"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const UserSchema_1 = require("../../user/schema/UserSchema");
const EventSchema_1 = require("../schema/EventSchema");
let FeedService = class FeedService {
    constructor(eventModel, userModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
    }
    async myFeed(req) {
        const user = await this.userModel.findById({ _id: req.user.userId });
        const myOwnFeed = [user.participations, user.likes, user.events];
        const follows = await this.userModel.find({ _id: { $in: user.follow } });
        const eventFollows = [];
        for (const i in follows) {
            eventFollows.push(follows[i].likes, follows[i].participations, follows[i].events);
        }
        const merged = [].concat.apply([], myOwnFeed.concat(eventFollows));
        const uniq = [...new Set(merged)];
        const events = await this.eventModel.find({ _id: { $in: uniq } });
        return { events };
    }
};
FeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(EventSchema_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FeedService);
exports.FeedService = FeedService;
//# sourceMappingURL=FeedService.js.map