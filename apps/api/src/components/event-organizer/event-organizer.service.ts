import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { EventOrganizer } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { EventOrganizersArgs } from './dto/event-organizers.args';
import { EventOrganizerConnection } from './dto/event-organizer.connection';

@Injectable()
export class EventOrganizerService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<EventOrganizer | null> {
    return this.prisma.eventOrganizer.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: EventOrganizersArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<EventOrganizerConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.eventOrganizer.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.eventOrganizer.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
