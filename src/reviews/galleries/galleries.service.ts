import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ReviewGalleriesService {
  constructor(
    @InjectModel('ReviewGalleries') private reviewGalleryModel: Model<any>,
  ) {}

  // async getAll() {
  //   return this.reviewsModel.find();
  // }

  async upload(data, images) {
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
