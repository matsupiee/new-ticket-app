import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { TicketTypePriceDistribution } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketTypePriceDistributionService } from './ticket-type-price-distribution.service';

@Resolver(() => TicketTypePriceDistribution)
export class TicketTypePriceDistributionResolver {
  constructor(
    private readonly ticketTypePriceDistributionService: TicketTypePriceDistributionService,
  ) {}
}
