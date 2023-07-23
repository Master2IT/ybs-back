import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsDto } from './collections.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {
    this.collectionsService = collectionsService;
  }

  @Get()
  async getAll() {
    return await this.collectionsService.getAll();
  }
  @Get(':id')
  async getOne(@Param('id') id) {
    return await this.collectionsService.getOne(id);
  }

  @Post()
  async create(@Body() data: CollectionsDto): Promise<CollectionsDto> {
    return await this.collectionsService.create(data);
  }
}
