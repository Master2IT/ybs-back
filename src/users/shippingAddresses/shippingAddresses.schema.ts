import * as mongoose from 'mongoose';

export const ShippingAddressesSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  countryId: Number,
  cityId: Number,
  state: String,
  postalCode: String,
  description: String,
  phone: String,
  email: String,
  userId: String,
  isDefault: Boolean,
});
