import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { FavoriteArtist } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { FavoriteArtistService } from './favorite-artist.service';

@Resolver(() => FavoriteArtist)
export class FavoriteArtistResolver {
  constructor(private readonly favoriteArtistService: FavoriteArtistService) {}
}
