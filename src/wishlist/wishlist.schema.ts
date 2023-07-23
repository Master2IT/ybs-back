import * as mongoose from 'mongoose';

export const WishlistSchema = new mongoose.Schema({
  productIds: [Number],
  categoryIds: [Number],
  tagIds: [Number],
  userId: Number,
});
