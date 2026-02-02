import { Module } from '@nestjs/common';
import { PaymentCardResolver } from './payment-card.resolver';
import { PaymentCardService } from './payment-card.service';

@Module({
  providers: [PaymentCardResolver, PaymentCardService],
})
export class PaymentCardModule {}
