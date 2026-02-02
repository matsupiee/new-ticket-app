import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { TicketApplicationItem } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketApplicationItemsArgs } from './dto/ticket-application-items.args';
import { TicketApplicationItemConnection } from './dto/ticket-application-item.connection';

@Injectable()
export class TicketApplicationItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<TicketApplicationItem | null> {
    return this.prisma.ticketApplicationItem.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: TicketApplicationItemsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketApplicationItemConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.ticketApplicationItem.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.ticketApplicationItem.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
