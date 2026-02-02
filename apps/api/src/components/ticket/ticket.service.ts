import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Ticket } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketsArgs } from './dto/tickets.args';
import { TicketConnection } from './dto/ticket.connection';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: TicketsArgs,
    resolveInfo: GraphQLResolveInfo,
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
