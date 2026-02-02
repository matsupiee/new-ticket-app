import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Venue } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { VenuesArgs } from './dto/venues.args';
import { VenueConnection } from './dto/venue.connection';

@Injectable()
export class VenueService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Venue | null> {
    return this.prisma.venue.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: VenuesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<VenueConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.venue.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.venue.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
