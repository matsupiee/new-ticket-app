import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { TicketTypeFee } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketTypeFeesArgs } from './dto/ticket-type-fees.args';
import { TicketTypeFeeConnection } from './dto/ticket-type-fee.connection';

@Injectable()
export class TicketTypeFeeService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<TicketTypeFee | null> {
    return this.prisma.ticketTypeFee.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: TicketTypeFeesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketTypeFeeConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.ticketTypeFee.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.ticketTypeFee.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
