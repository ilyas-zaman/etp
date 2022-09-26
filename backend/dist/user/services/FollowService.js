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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const UserSchema_1 = require("../schema/UserSchema");
let FollowService = class FollowService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async follow(req, username) {
        const userID = await this.userModel.findById(req.user.userId);
        const follower = await this.userModel.findOneAndUpdate({ username: username }, { $push: { follower: userID._id } });
        if (!follower) {
            throw new common_1.NotFoundException('cannot found this user');
        }
        const userN = await this.userModel.findByIdAndUpdate({ _id: req.user.userId }, { $push: { follow: follower._id } });
        const user = JSON.stringify(userN._id);
        const follow = JSON.stringify(follower._id);
        if (follow === user) {
            throw new common_1.BadRequestException("you can't follow ur self");
        }
        follower.save();
        userN.save();
        return {
            message: 'successfully follow',
        };
    }
    async unfollow(req, username) {
        const userID = await this.userModel.findById(req.user.userId);
        const follower = await this.userModel.findOneAndUpdate({ username: username }, { $pull: { follower: userID._id } });
        if (!follower) {
            throw new common_1.NotFoundException('cannot found this user');
        }
        const userN = await this.userModel.findByIdAndUpdate({ _id: req.user.userId }, { $pull: { follow: follower._id } });
        if (!req.user.userId) {
            throw new common_1.HttpException('no user connected', 404);
        }
        userN.save();
        follower.save();
        return {
            message: 'successfully unfollow',
        };
    }
};
__decorate([
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowService.prototype, "follow", null);
__decorate([
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowService.prototype, "unfollow", null);
FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(UserSchema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FollowService);
exports.FollowService = FollowService;
//# sourceMappingURL=FollowService.js.map