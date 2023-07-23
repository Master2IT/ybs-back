import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  phone: String,
  email: String,
  name: String,
  // password: String,
  status: String,
  shippingAddressId: Number,
  paymentInfoId: Number,
  orderIds: [Number],
  discountIds: [Number],
  newsLetterIds: [Number],
  type: String,
  password: String,
});
