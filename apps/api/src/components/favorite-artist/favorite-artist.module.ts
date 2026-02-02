import { Module } from '@nestjs/common';
import { FavoriteArtistResolver } from './favorite-artist.resolver';
import { FavoriteArtistService } from './favorite-artist.service';

@Module({
  providers: [FavoriteArtistResolver, FavoriteArtistService],
})
export class FavoriteArtistModule {}
