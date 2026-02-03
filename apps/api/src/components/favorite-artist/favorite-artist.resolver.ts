import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Artist,
  FavoriteArtist,
  User,
} from 'src/generated/prisma-nestjs-graphql';
import { FavoriteArtistService } from './favorite-artist.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => FavoriteArtist)
export class FavoriteArtistResolver {
  constructor(
    private readonly favoriteArtistService: FavoriteArtistService,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField(() => User)
  async user(@Parent() favoriteArtist: FavoriteArtist) {
    return await this.prisma.favoriteArtist
      .findUnique({
        where: {
          userId_artistId: {
            userId: favoriteArtist.userId,
            artistId: favoriteArtist.artistId,
          },
        },
      })
      .user();
  }

  @ResolveField(() => Artist)
  async artist(@Parent() favoriteArtist: FavoriteArtist) {
    return await this.prisma.favoriteArtist
      .findUnique({
        where: {
          userId_artistId: {
            userId: favoriteArtist.userId,
            artistId: favoriteArtist.artistId,
          },
        },
      })
      .artist();
  }
}
