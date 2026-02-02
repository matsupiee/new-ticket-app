import { Module } from '@nestjs/common';
import { TicketTypePriceDistributionResolver } from './ticket-type-price-distribution.resolver';
import { TicketTypePriceDistributionService } from './ticket-type-price-distribution.service';

@Module({
  providers: [
    TicketTypePriceDistributionResolver,
    TicketTypePriceDistributionService,
  ],
})
export class TicketTypePriceDistributionModule {}
