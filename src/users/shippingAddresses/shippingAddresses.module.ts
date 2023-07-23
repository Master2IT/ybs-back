import { Module } from '@nestjs/common';
import { ShippingAddressesService } from './shippingAddresses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingAddressesSchema } from './shippingAddresses.schema';
import { ShippingAddressesController } from './shippingAddresses.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ShippingAddresses', schema: ShippingAddressesSchema },
    ]),
  ],
  providers: [ShippingAddressesService],
  controllers: [ShippingAddressesController],
})
export class ShippingAddressesModule {}
