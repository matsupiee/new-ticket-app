import { Args, ID, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Artist } from 'src/generated/prisma-nestjs-graphql';
import { ArtistConnection } from './dto/artist.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { ArtistsArgs } from './dto/artists.args';
import { ArtistService } from './artist.service';
import { ArtistCreateInput } from './dto/artist-create.input';
import { ArtistCreatePayload } from './dto/artist-create.payload';
import { UseGuards } from '@nestjs/common';
import { EasyGuard } from '../guard/easy-guard';

@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private readonly artistService: ArtistService) {}

  @Query(() => Artist, {
    description: 'アーティストを1件取得する',
    nullable: true,
  })
  async artist(@Args('id', { type: () => ID }) id: string) {
    return this.artistService.findOne(id);
  }

  @Query(() => ArtistConnection, {
    description: 'アーティストを複数取得する',
  })
  async artists(
    @Args() args: ArtistsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<ArtistConnection> {
    return this.artistService.findMany(args, resolveInfo);
  }

  @Mutation(() => ArtistCreatePayload, {
    description: 'アーティストを作成する',
  })
  @UseGuards(EasyGuard)
  async artistCreate(
    @Args('input') input: ArtistCreateInput,
  ): Promise<ArtistCreatePayload> {
    const artist = await this.artistService.create(input);
    return { artist };
  }
}
