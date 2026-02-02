import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Artist } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { ArtistsArgs } from './dto/artists.args';
import { ArtistConnection } from './dto/artist.connection';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Artist | null> {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: ArtistsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<ArtistConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.artist.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.artist.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
