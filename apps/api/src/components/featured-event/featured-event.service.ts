import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { FeaturedEvent } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { FeaturedEventsArgs } from './dto/featured-events.args';
import { FeaturedEventConnection } from './dto/featured-event.connection';

@Injectable()
export class FeaturedEventService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<FeaturedEvent | null> {
    return this.prisma.featuredEvent.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: FeaturedEventsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<FeaturedEventConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.featuredEvent.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.featuredEvent.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
