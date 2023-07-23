import * as mongoose from 'mongoose';

export const SizesSchema = new mongoose.Schema({
  title: String,
  value: String,
});
