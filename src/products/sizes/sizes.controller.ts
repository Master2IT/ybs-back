import { Body, Controller, Get, Post } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizesDto } from './sizes.dto';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {
    this.sizesService = sizesService;
  }

  @Get()
  async getAll() {
    return await this.sizesService.getAll();
  }

  @Post()
  async create(@Body() data: SizesDto): Promise<SizesDto> {
    return await this.sizesService.create(data);
  }
}
