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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const EventSchema_1 = require("../schema/EventSchema");
const mongoose_2 = require("mongoose");
const UserSchema_1 = require("../../user/schema/UserSchema");
let LikesService = class LikesService {
    constructor(eventModel, userModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
    }
    async likeEvents(id, req) {
        try {
            let event = await this.eventModel.findById(id);
            if (!event)
                throw new common_1.NotFoundException('Could not find event');
            event = await this.eventModel.findOneAndUpdate({ _id: id, userLike: { $ne: req.user.userId } }, { $push: { userLike: req.user.userId } });
            const user = await this.userModel.findByIdAndUpdate({ _id: req.user.userId }, { $push: { likes: event.id } });
            event.save();
            user.save();
            return { message: `You like the ${event.name} !` };
        }
        catch (err) {
            throw new common_1.ConflictException('You already like this event !');
        }
    }
    async getLikesByEvents(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Could not find event');
        const event = await this.eventModel.findById({ _id: id });
        if (!event)
            throw new common_1.NotFoundException('Could not find event');
        return { UserLike: event.userLike };
    }
    async removelikeEvents(id, req) {
        try {
            let event = await this.eventModel.findById(id);
            if (!event)
                throw new common_1.NotFoundException('Could not find event');
            event = await this.eventModel.findOneAndUpdate({ _id: id, userLike: { $eq: req.user.userId } }, { $pull: { userLike: req.user.userId } });
            const user = await this.userModel.findByIdAndUpdate({ _id: req.user.userId }, { $pull: { likes: event.id } });
            event.save();
            user.save();
            return { message: `You no longer like ${event.name}` };
        }
        catch (err) {
            throw new common_1.NotFoundException('No likes found to remove');
        }
    }
};
LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(EventSchema_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], LikesService);
exports.LikesService = LikesService;
//# sourceMappingURL=LikesService.js.map