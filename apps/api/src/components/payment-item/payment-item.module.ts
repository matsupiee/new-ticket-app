import { Module } from '@nestjs/common';
import { PaymentItemResolver } from './payment-item.resolver';
import { PaymentItemService } from './payment-item.service';

@Module({
  providers: [PaymentItemResolver, PaymentItemService],
})
export class PaymentItemModule {}
