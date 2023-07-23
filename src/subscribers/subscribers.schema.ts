import * as mongoose from 'mongoose';

export const SubscribersSchema = new mongoose.Schema({
  email: String,
});
