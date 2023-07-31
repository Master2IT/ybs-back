import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewsDto, ReviewsDto } from './reviews.dto';
import { Model } from 'mongoose';
import { ReviewGalleriesService } from './galleries/galleries.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Reviews') private reviewsModel: Model<CreateReviewsDto>,
    @Inject(ReviewGalleriesService)
    private readonly reviewGalleriesService: ReviewGalleriesService,
  ) {}

  async getAll(user) {
    if (user.type == 'admin') {
      return this.reviewsModel.find();
    }

    const reviews: ReviewsDto[] = await this.reviewsModel.find({
      userId: user.id,
    });

    if (!reviews && !reviews.length) {
      return {
        data: [],
        total: 0,
      };
    }

    return {
      data: reviews.map((review) => ({
        _id: review._id,
        rate: review.rate,
        title: review.title,
        description: review.description,
        recommend: review.recommend,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      })),
      total: reviews.length,
    };
  }

  async getReviewsByProductId(productId) {
    const reviews = await this.reviewsModel.find({
      productId,
      // status: 'active',
    });
    return await Promise.all(
      reviews.map(async (review: any) => ({
        _id: review._id,
        rate: review.rate,
        title: review.title,
        description: review.description,
        recommend: review.recommend,
        images: await this.reviewGalleriesService.getReviewGalleriesById(
          review._id,
        ),
        userId: review.userId,
        createdAt: review.createdAt,
      })),
    );
  }

  async create(review: CreateReviewsDto, user) {
    const newProduct = new this.reviewsModel({
      ...review,
      userId: user._id,
      status: 'pending', // active | pending | disable
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CreateReviewsDto);
    return await newProduct.save();
  }
}
