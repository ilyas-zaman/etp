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
exports.ParticipationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const EventSchema_1 = require("../schema/EventSchema");
const mongoose_2 = require("mongoose");
const UserSchema_1 = require("../../user/schema/UserSchema");
let ParticipationsService = class ParticipationsService {
    constructor(eventModel, userModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
    }
    async participateEvent(id, req) {
        try {
            let event = await this.eventModel.findById(id);
            event = await this.eventModel.findOneAndUpdate({ _id: id, userParticipant: { $ne: req.user.userId } }, {
                $push: { userParticipant: req.user.userId },
                $inc: { seats: -1 },
            });
            const user = await this.userModel.findByIdAndUpdate({ _id: req.user.userId }, { $push: { participations: event.id } });
            event.save();
            user.save();
            return { message: `You have been added to ${event.name} !` };
        }
        catch (err) {
            if (!mongoose_2.Types.ObjectId.isValid(id))
                throw new common_1.NotFoundException('Could not find event');
            else
                throw new common_1.ConflictException('You are already in !');
        }
    }
    async boycottEvent(id, req) {
        try {
            let event = await this.eventModel.findById(id);
            event = await this.eventModel.findOneAndUpdate({ _id: id, userParticipant: { $eq: req.user.userId } }, {
                $pull: { userParticipant: req.user.userId },
                $inc: { seats: 1 },
            });
            const user = await this.userModel.findByIdAndUpdate({ _id: req.user.userId }, { $pull: { participations: event.id } });
            event.save();
            user.save();
            return { message: `You have been removed from ${event.name}` };
        }
        catch (err) {
            if (!mongoose_2.Types.ObjectId.isValid(id))
                throw new common_1.NotFoundException('Could not find event');
            else
                throw new common_1.NotFoundException('You are not in event !');
        }
    }
    async getParticipantsByEvents(id) {
        const event = await this.eventModel.findById(id);
        if (!event)
            throw new common_1.NotFoundException('Could not find event');
        if (event.userParticipant === null) {
            return { message: 'There is no participants' };
        }
        return { Participants: event.userParticipant };
    }
};
ParticipationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(EventSchema_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ParticipationsService);
exports.ParticipationsService = ParticipationsService;
//# sourceMappingURL=ParticipationsService.js.map