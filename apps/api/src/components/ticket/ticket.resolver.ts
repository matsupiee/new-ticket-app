import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Ticket } from 'src/generated/prisma-nestjs-graphql';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { TicketConnection } from './dto/ticket.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketsArgs } from './dto/tickets.args';
import { TicketCreateInput } from './dto/ticket-create.input';
import { TicketCreatePayload } from './dto/ticket-create.payload';
import { TicketUpdateInput } from './dto/ticket-update.input';
import { TicketUpdatePayload } from './dto/ticket-update.payload';
import { TicketDeletePayload } from './dto/ticket-delete.payload';

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
      include: { event: true },
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
          include: { event: true },
        }),
      () => this.prisma.ticket.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }

  @Mutation(() => TicketCreatePayload, {
    description: 'チケットを作成する',
  })
  async ticketCreate(
    @Args('input') input: TicketCreateInput,
  ): Promise<TicketCreatePayload> {
    const ticket = await this.prisma.ticket.create({
      data: {
        name: input.name,
        price: input.price,
        stock: input.stock,
        event: { connect: { id: input.eventId } },
      },
      include: { event: true },
    });
    return { ticket };
  }

  @Mutation(() => TicketUpdatePayload, {
    description: 'チケットを更新する',
  })
  async ticketUpdate(
    @Args('input') input: TicketUpdateInput,
  ): Promise<TicketUpdatePayload> {
    const { id, ...data } = input;
    const ticket = await this.prisma.ticket.update({
      where: { id },
      data,
      include: { event: true },
    });
    return { ticket };
  }

  @Mutation(() => TicketDeletePayload, {
    description: 'チケットを削除する',
  })
  async ticketDelete(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<TicketDeletePayload> {
    const ticket = await this.prisma.ticket.delete({
      where: { id },
      include: { event: true },
    });
    return { ticket };
  }
}
