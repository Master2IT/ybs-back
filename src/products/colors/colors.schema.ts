import * as mongoose from 'mongoose';

export const ColorsSchema = new mongoose.Schema({
  title: String,
  value: String,
});
