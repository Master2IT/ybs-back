import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ReviewReactionsService } from './reactions.service';
import { AuthGuard } from '@nestjs/passport';
import { ReviewReactionsDto } from './reactions.dto';
import { CurrentUser } from '../../auth/current-user.decorator';
import { UpdateUserDto } from '../../users/users.dto';

@Controller('reviews/reaction')
export class ReviewReactionsController {
  constructor(private readonly reviewReactionsService: ReviewReactionsService) {
    this.reviewReactionsService = reviewReactionsService;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addReaction(
    @Body() data: ReviewReactionsDto,
    @CurrentUser() user: UpdateUserDto,
  ) {
    return this.reviewReactionsService.addReaction(data, user);
  }
}
