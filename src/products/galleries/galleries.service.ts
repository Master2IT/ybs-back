import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GalleriesDto } from './galleries.dto';

@Injectable()
export class GalleriesService {
  constructor(
    @InjectModel('ProductGalleries')
    private galleriesModel: Model<GalleriesDto>,
  ) {}

  async getOne(id: string) {
    return this.galleriesModel.findOne({ userId: id });
  }

  async getImages(id: string) {
    const found: any = await this.galleriesModel.findOne({ productId: id });

    if (!found?._id) {
      return {};
    }

    return {
      _id: found._id,
      images: found.images,
    };
  }

  async create(file: Express.Multer.File, data: GalleriesDto): Promise<any> {
    const foundGallery: any = await this.galleriesModel.findOneAndUpdate(
      {
        productId: data.productId,
      },
      {
        $push: {
          images: {
            name: file.filename,
            mimetype: file.mimetype,
            alt: data.alt,
            size: file.size,
            path: file.filename,
          },
        },
      },
    );

    if (!foundGallery) {
      const model = new this.galleriesModel({
        images: [
          {
            // id: ObjectId
            name: file.filename,
            mimetype: file.mimetype,
            alt: data.alt,
            size: file.size,
            path: file.filename,
          },
        ],
        productId: data.productId,
      });
      return await model.save();
    }

    return foundGallery;
  }
}
