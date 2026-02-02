import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { StageArtist } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { StageArtistService } from './stage-artist.service';

@Resolver(() => StageArtist)
export class StageArtistResolver {
  constructor(private readonly stageArtistService: StageArtistService) {}
}
