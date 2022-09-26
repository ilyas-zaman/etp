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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const EventSchema_1 = require("../schema/EventSchema");
const mongoose_2 = require("mongoose");
const UserSchema_1 = require("../../user/schema/UserSchema");
let EventsService = class EventsService {
    constructor(eventModel, userModel) {
        this.eventModel = eventModel;
        this.userModel = userModel;
    }
    async createEvent(createEventDto, req) {
        const event = await new this.eventModel(createEventDto);
        event.userId = req.user.userId;
        event.category = createEventDto.category;
        event.city = createEventDto.city;
        console.log(event.category);
        console.log(event.city);
        const user = await this.userModel.findByIdAndUpdate({ _id: req.user.userId }, { $push: { events: event.id } });
        user.save();
        event.save();
        return {
            event,
            message: 'Event successfuly created',
        };
    }
    async getEventById(id) {
        const event = await this.eventModel.findById(id);
        if (!event)
            throw new common_1.NotFoundException('Could not find event');
        return event;
    }
    async updateEvent(id, updateEventDto, req) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Could not find event');
        let event = await this.eventModel.findById({ _id: id });
        if (!event) {
            throw new common_1.NotFoundException('No event found');
        }
        if (event && event.userId != req.user.userId) {
            throw new common_1.UnauthorizedException('You not authorized to update this event');
        }
        event = await this.eventModel.findByIdAndUpdate({ _id: id }, updateEventDto);
        event.save();
        return { message: 'Event updated !' };
    }
    async deleteEvent(id, req) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Could not find event');
        const event = await this.eventModel.findById({ _id: id });
        if (!event)
            throw new common_1.NotFoundException('Could not find event');
        if (event && event.userId != req.user.userId) {
            throw new common_1.UnauthorizedException('You are not authorized to remove this event');
        }
        await this.userModel.updateMany({
            $pull: { events: event.id, participations: event.id, likes: event.id },
        });
        event.remove();
        return { message: 'Event deleted !' };
    }
    async getEvents() {
        const events = await this.eventModel.find();
        return events;
    }
    async getEventsByCategory(id) {
        const events = await this.eventModel.find({ category: id });
        return events;
    }
    async getEventsByCity(id) {
        const events = await this.eventModel.find({ city: id });
        return events;
    }
    async getMyEvents(req) {
        const events = await this.eventModel.find({ userId: req.user.userId });
        return events;
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(EventSchema_1.Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=EventService.js.map