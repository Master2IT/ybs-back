import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LanguageDto } from './languages.dto';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {
    this.languagesService = languagesService;
  }
  @Get()
  async getAll() {
    return this.languagesService.getAll();
  }
  @Get(':id')
  async getOne(@Param('id') param) {
    return this.languagesService.getOne(param);
  }

  @Post()
  async create(@Body() languageDto: LanguageDto): Promise<any> {
    return this.languagesService.create(languageDto);
  }
}
