import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { TicketTypeFeeDistribution } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketTypeFeeDistributionService } from './ticket-type-fee-distribution.service';

@Resolver(() => TicketTypeFeeDistribution)
export class TicketTypeFeeDistributionResolver {
  constructor(
    private readonly ticketTypeFeeDistributionService: TicketTypeFeeDistributionService,
  ) {}
}
