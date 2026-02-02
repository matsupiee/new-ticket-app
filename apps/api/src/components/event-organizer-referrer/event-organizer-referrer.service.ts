import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { EventOrganizerReferrer } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { EventOrganizerReferrersArgs } from './dto/event-organizer-referrers.args';
import { EventOrganizerReferrerConnection } from './dto/event-organizer-referrer.connection';

@Injectable()
export class EventOrganizerReferrerService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<EventOrganizerReferrer | null> {
    return this.prisma.eventOrganizerReferrer.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: EventOrganizerReferrersArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<EventOrganizerReferrerConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.eventOrganizerReferrer.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.eventOrganizerReferrer.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
