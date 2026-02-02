import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { EventOrganizerFeature } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { EventOrganizerFeaturesArgs } from './dto/event-organizer-features.args';
import { EventOrganizerFeatureConnection } from './dto/event-organizer-feature.connection';

@Injectable()
export class EventOrganizerFeatureService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<EventOrganizerFeature | null> {
    return this.prisma.eventOrganizerFeature.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: EventOrganizerFeaturesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<EventOrganizerFeatureConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.eventOrganizerFeature.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.eventOrganizerFeature.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
