import * as mongoose from 'mongoose';

export const ReviewReactionsSchema = new mongoose.Schema({
  reviewId: String,
  reaction: Boolean,
  userId: String,
});
