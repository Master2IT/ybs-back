import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CheckCodeDto,
  LoginAdminDto,
  LoginEmailDto,
  LoginPhoneDto,
} from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './current-user.decorator';
import { UpdateUserDto } from '../users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }
  @Post('login/phone')
  async loginByPhone(@Body() phone: LoginPhoneDto) {
    return this.authService.loginByPhone(phone);
  }

  @Post('login/email')
  async loginByEmail(@Body() email: LoginEmailDto) {
    return this.authService.loginByEmail(email);
  }
  @Post('login/admin')
  async adminLogin(@Body() data: LoginAdminDto) {
    return this.authService.adminLogin(data);
  }

  @Post('code')
  @UsePipes(new ValidationPipe({ transform: true }))
  async checkCode(@Body() body: CheckCodeDto) {
    const { email, phone, code } = body;

    if (!email && !phone) {
      throw new BadRequestException();
    }

    return this.authService.checkCode(email, phone, code);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@CurrentUser() user: UpdateUserDto) {
    return user;
  }
}
