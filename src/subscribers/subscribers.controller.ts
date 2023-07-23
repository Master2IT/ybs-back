import { Body, Controller, Post } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { subscribersDto } from './subscribers.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {
    this.subscribersService = subscribersService;
  }

  @Post()
  async submitEmail(@Body() data: subscribersDto) {
    return this.subscribersService.submitEmail(data);
  }
}
