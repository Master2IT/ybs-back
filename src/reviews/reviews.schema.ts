import * as mongoose from 'mongoose';

export const ReviewsSchema = new mongoose.Schema({
  rate: Number,
  title: String,
  description: String,
  recommend: Boolean,
  galleriesId: String,
  userId: String,
  productId: String,
  status: String, // active | pending | disable
  createdAt: Date,
  updatedAt: Date,
});
