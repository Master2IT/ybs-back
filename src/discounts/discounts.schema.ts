import * as mongoose from 'mongoose';

export const DiscountsSchema = new mongoose.Schema({
  title: String,
  status: String,
  type: String,
  count: Number,
  value: Number,
});
