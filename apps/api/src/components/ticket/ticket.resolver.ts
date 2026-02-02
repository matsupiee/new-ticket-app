import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { Ticket } from 'src/generated/prisma-nestjs-graphql';
import { TicketConnection } from './dto/ticket.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { TicketsArgs } from './dto/tickets.args';
import { TicketService } from './ticket.service';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Query(() => Ticket, {
    description: 'チケットを1件取得する',
    nullable: true,
  })
  async ticket(@Args('id', { type: () => ID }) id: string) {
    return this.ticketService.findOne(id);
  }

  @Query(() => TicketConnection, {
    description: 'チケットを複数取得する',
  })
  async tickets(
    @Args() args: TicketsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketConnection> {
    return this.ticketService.findMany(args, resolveInfo);
  }
}
