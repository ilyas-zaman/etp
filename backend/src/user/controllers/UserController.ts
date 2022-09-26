import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dto/CreateUserDto';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import { UserService } from '../services/UserService';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAllUsers() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  public async getProfile(@Request() req) {
    return await this.userService.getSelf(req);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/events/created')
  public async getUserEvents(@Request() req: any) {
    return await this.userService.getEvents(req);
  }

  @Get('/username/:username')
  public async getUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return user;
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  public async getUser(@Res() res, @Param('id') userId: string) {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException('User does not exist!');
      }
      return user;
    } catch (error) {
      if (error) {
        throw new NotFoundException('User does not exist!');
      }
    }
  }

  @Post()
  public async createUser(
    @Res() res,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    const savedUser = await this.userService
      .createUser(createUserDto)
      .catch((error) => {
        if (error.code == 11000) {
          throw new HttpException(
            `User with username ${createUserDto.username} and/or email ${createUserDto.email} already exists`,
            409,
          );
        }
      });
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      savedUser,
    });
  }

  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
  })
  public async updateUser(
    @Res() res,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.updateUser(id, updateUserDto);
      if (!user) {
        throw new NotFoundException('User does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
        status: 400,
      });
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async deleteUser(@Res() res, @Param('id') id: any, @Request() req) {
    const user = await this.userService.deleteUser(id, req);
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
