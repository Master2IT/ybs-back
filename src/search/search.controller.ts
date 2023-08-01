import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {
    this.searchService = searchService;
  }

  @Get()
  async search(@Query('s') search: string, @Query('type') type: string) {
    return this.searchService.search(search, type);
  }
}
