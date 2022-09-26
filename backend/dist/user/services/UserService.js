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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const UserSchema_1 = require("../schema/UserSchema");
const bcrypt = require("bcrypt");
const EventService_1 = require("../../events/services/EventService");
const EventSchema_1 = require("../../events/schema/EventSchema");
let UserService = class UserService {
    constructor(userModel, eventModel, eventService) {
        this.userModel = userModel;
        this.eventModel = eventModel;
        this.eventService = eventService;
    }
    async findAll() {
        return await this.userModel.find().populate('follower').exec();
    }
    async getSelf(req) {
        const user = await this.userModel.findOne({ _id: req.user.userId });
        return user;
    }
    async findOne(id) {
        const user = await this.userModel
            .findById({ _id: id })
            .populate('follow', 'follower')
            .exec();
        if (!user) {
            throw new common_1.HttpException(`User with the ${id} was not found`, 404);
        }
        return user;
    }
    async createUser(createUserDto) {
        const newUser = await new this.userModel(createUserDto);
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser.save();
    }
    async updateUser(id, updateUserDto) {
        const updateUser = await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto);
        if (updateUserDto.password) {
            await bcrypt.hash(updateUserDto.password, 10);
        }
        return updateUser.save();
    }
    async deleteUser(id, req) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.NotFoundException('Could not find user');
        const user = await this.userModel.findById({ _id: id });
        if (!user)
            throw new common_1.NotFoundException('Could not find user');
        if (user.id != req.user.userId) {
            throw new common_1.UnauthorizedException('You are not authorized to remove this user');
        }
        const IdToDelete = req.user.userId;
        console.log(IdToDelete);
        const follows = await this.userModel.updateMany({ follow: { $in: [new mongoose_2.Types.ObjectId(IdToDelete)] } }, { $pull: { follow: { $in: [new mongoose_2.Types.ObjectId(IdToDelete)] } } });
        const followers = await this.userModel.updateMany({ follower: { $in: [new mongoose_2.Types.ObjectId(IdToDelete)] } }, { $pull: { follower: { $in: [new mongoose_2.Types.ObjectId(IdToDelete)] } } });
        if (follows)
            console.log(follows);
        if (followers)
            console.log(followers);
        user.events.forEach(async (element) => {
            await this.eventService.deleteEvent(element, req);
            return 'dodo';
        });
        await this.eventModel.deleteMany({ userId: req.user.userId });
        await this.userModel.updateMany({
            $pull: {
                participations: { $in: user.events },
                likes: { $in: user.events },
            },
        });
        user.remove();
        return { message: 'User deleted !' };
    }
    async getUserByUsername(username) {
        const user = await this.userModel.findOne({ username: username });
        if (!user) {
            throw new common_1.HttpException(`User with username ${username} not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async getEvents(req) {
        const event = await this.eventModel.find({ userId: req.user.userId });
        console.log(event);
        return event;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(EventSchema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        EventService_1.EventsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map