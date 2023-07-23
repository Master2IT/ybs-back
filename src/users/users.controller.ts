import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './users.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
    this.usersService = usersService;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@CurrentUser() user: UpdateUserDto) {
    return this.usersService.getAll(user);
  }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('userId') userId) {
    return this.usersService.getUserById(userId);
  }

  @Put(':userId')
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() user: UpdateUserDto, @Param('userId') userId) {
    return { user, userId };
  }
}
