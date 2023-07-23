import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../auth/current-user.decorator';
import { UpdateUserDto } from '../users.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@CurrentUser() user: UpdateUserDto) {
    return this.ordersService.getAll(user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOrderDetails(@Param('id') id) {
    return this.ordersService.getOrderDetails(id);
  }

  // @Post()
  // async create(@Body() shippingAddressesDto: CreateOrdersDto): Promise<any> {
  //   return this.ordersService.create(shippingAddressesDto);
  // }
}
