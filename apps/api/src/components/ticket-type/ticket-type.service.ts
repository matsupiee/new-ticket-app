import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { TicketType } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketTypesArgs } from './dto/ticket-types.args';
import { TicketTypeConnection } from './dto/ticket-type.connection';

@Injectable()
export class TicketTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<TicketType | null> {
    return this.prisma.ticketType.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: TicketTypesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketTypeConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.ticketType.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.ticketType.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
