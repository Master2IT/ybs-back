import { Body, Controller, Get, Post } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorsDto } from './colors.dto';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {
    this.colorsService = colorsService;
  }

  @Get()
  async getAll() {
    return await this.colorsService.getAll();
  }

  @Post()
  async create(@Body() data: ColorsDto): Promise<ColorsDto> {
    return await this.colorsService.create(data);
  }
}
