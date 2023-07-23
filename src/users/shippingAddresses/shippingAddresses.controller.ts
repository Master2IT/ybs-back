import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ShippingAddressesService } from './shippingAddresses.service';
import {
  ShippingAddressesDto,
  UpdateShippingAddressesDto,
} from './shippingAddresses.dto';

@Controller('shippingAddresses')
export class ShippingAddressesController {
  constructor(
    private readonly shippingAddressesService: ShippingAddressesService,
  ) {
    this.shippingAddressesService = shippingAddressesService;
  }

  @Get()
  async getAll() {
    return await this.shippingAddressesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return this.shippingAddressesService.getOne(id);
  }

  @Post()
  async create(
    @Body() shippingAddressesDto: ShippingAddressesDto,
  ): Promise<any> {
    return this.shippingAddressesService.create(shippingAddressesDto);
  }

  @Put()
  async update(
    @Body() updateShippingAddressesDto: UpdateShippingAddressesDto,
  ): Promise<any> {
    return this.shippingAddressesService.update(updateShippingAddressesDto);
  }
}
