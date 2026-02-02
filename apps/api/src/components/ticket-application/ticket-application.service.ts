import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { TicketApplication } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketApplicationsArgs } from './dto/ticket-applications.args';
import { TicketApplicationConnection } from './dto/ticket-application.connection';

@Injectable()
export class TicketApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<TicketApplication | null> {
    return this.prisma.ticketApplication.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: TicketApplicationsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketApplicationConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.ticketApplication.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.ticketApplication.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
