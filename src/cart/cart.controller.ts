import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorator';
import { UpdateUserDto } from '../users/users.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {
    this.cartService = cartService;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCart(@CurrentUser() user: UpdateUserDto) {
    return this.cartService.getCart(user?._id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addToCart(@CurrentUser() user: UpdateUserDto, @Body() cart: CartDto) {
    return this.cartService.addToCart(user, cart);
  }
}
