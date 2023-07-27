import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReviewGalleriesService {
  constructor(
    @InjectModel('ReviewGalleries') private reviewGalleryModel: Model<any>,
  ) {}

  async getAll() {
    return this.reviewGalleryModel.find();
  }

  async getReviewGalleriesById(reviewId) {
    const review = await this.reviewGalleryModel.findOne({ reviewId });

    return review && review.images ? [...review.images] : null;
  }

  async upload(data, images) {
    if (!images && !images.length) {
      throw new Error('Images Required!');
    }
    const foundGallery: any = await this.reviewGalleryModel.findOneAndUpdate(
      {
        reviewId: data.reviewId,
      },
      {
        $addToSet: {
          images: {
            $each: [
              ...images.map((image) => ({
                name: image.filename,
                mimetype: image.mimetype,
                size: image.size,
                path: image.filename,
              })),
            ],
          },
        },
      },
    );

    if (!foundGallery) {
      const model = new this.reviewGalleryModel({
        images: images.map((image) => ({
          name: image.filename,
          mimetype: image.mimetype,
          size: image.size,
          path: image.filename,
        })),
        reviewId: data.reviewId,
      });
      return await model.save();
    }

    return foundGallery;
  }
}
