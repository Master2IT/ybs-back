import * as mongoose from 'mongoose';

export const ReviewGalleriesSchema = new mongoose.Schema({
  reviewId: String,
  images: [],
});
