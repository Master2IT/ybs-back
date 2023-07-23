import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTagDto } from './tags.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {
    this.tagsService = tagsService;
  }
  @Get()
  async getAll() {
    return this.tagsService.getAll();
  }

  @Get()
  async getOne(@Param('id') id) {
    return this.tagsService.getOne(id);
  }
  @Get()
  async getMany(@Param('ids') ids) {
    return this.tagsService.getMany(ids);
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<any> {
    return this.tagsService.create(createTagDto);
  }
}
