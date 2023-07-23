import { Body, Controller, Get, Post } from '@nestjs/common';
import { WashAndCareService } from './washAndCare.service';
import { WashAndCareDto } from './washAndCare.dto';

@Controller('products/washAndCare')
export class WashAndCareController {
  constructor(private readonly washAndCareService: WashAndCareService) {
    this.washAndCareService = washAndCareService;
  }

  @Get()
  async getAll() {
    return await this.washAndCareService.getAll();
  }

  @Post()
  async create(@Body() data: WashAndCareDto): Promise<WashAndCareDto> {
    return await this.washAndCareService.create(data);
  }
}
