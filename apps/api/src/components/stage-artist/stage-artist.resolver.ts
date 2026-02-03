import {
  Args,
  ID,
  Info,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Artist, StageArtist } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { StageArtistService } from './stage-artist.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => StageArtist)
export class StageArtistResolver {
  constructor(
    private readonly stageArtistService: StageArtistService,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField(() => Artist, {
    nullable: false,
  })
  async artist(@Parent() stageArtist: StageArtist) {
    return await this.prisma.stageArtist
      .findUnique({
        where: {
          stageId_artistId: {
            stageId: stageArtist.stageId,
            artistId: stageArtist.artistId,
          },
        },
      })
      .artist();
  }
}
