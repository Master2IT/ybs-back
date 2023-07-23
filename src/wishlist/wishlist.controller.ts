import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistDto } from './wishlist.dto';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {
    this.wishlistService = wishlistService;
  }
  @Get(':userId')
  async getWishlist(@Param('userId') param) {
    return this.wishlistService.getWishlist(param);
  }

  @Post()
  async addToWishlist(@Body() wishlistDto: WishlistDto): Promise<any> {
    return this.wishlistService.addToWishlist(wishlistDto);
  }
}
