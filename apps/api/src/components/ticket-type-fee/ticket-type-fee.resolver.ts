import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { TicketTypeFee } from 'src/generated/prisma-nestjs-graphql';
import { TicketTypeFeeConnection } from './dto/ticket-type-fee.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketTypeFeesArgs } from './dto/ticket-type-fees.args';
import { TicketTypeFeeService } from './ticket-type-fee.service';

@Resolver(() => TicketTypeFee)
export class TicketTypeFeeResolver {
  constructor(private readonly ticketTypeFeeService: TicketTypeFeeService) {}

  @Query(() => TicketTypeFee, {
    description: 'チケットタイプ手数料を1件取得する',
    nullable: true,
  })
  async ticketTypeFee(@Args('id', { type: () => ID }) id: string) {
    return this.ticketTypeFeeService.findOne(id);
  }

  @Query(() => TicketTypeFeeConnection, {
    description: 'チケットタイプ手数料を複数取得する',
  })
  async ticketTypeFees(
    @Args() args: TicketTypeFeesArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketTypeFeeConnection> {
    return this.ticketTypeFeeService.findMany(args, resolveInfo);
  }
}
