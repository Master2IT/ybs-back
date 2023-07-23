import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateDiscountDto } from './discounts.dto';
import { DiscountsService } from './discounts.service';

@Controller('discounts')
export class DiscountsController {
  constructor(private readonly discountsService: DiscountsService) {
    this.discountsService = discountsService;
  }
  @Get()
  async getAll() {
    return this.discountsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return this.discountsService.getOne(id);
  }

  @Post()
  async create(@Body() createDiscountDto: CreateDiscountDto): Promise<any> {
    return this.discountsService.create(createDiscountDto);
  }
}
