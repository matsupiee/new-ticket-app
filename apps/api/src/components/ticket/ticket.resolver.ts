import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { Ticket } from 'src/generated/prisma-nestjs-graphql';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { TicketConnection } from './dto/ticket.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketsArgs } from './dto/tickets.args';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Ticket, {
    description: 'チケットを1件取得する',
    nullable: true,
  })
  async ticket(@Args('id', { type: () => ID }) id: string) {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  @Query(() => TicketConnection, {
    description: 'チケットを複数取得する',
  })
  async tickets(
    @Args() args: TicketsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.ticket.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.ticket.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
