import { Module } from '@nestjs/common';
import { StageArtistResolver } from './stage-artist.resolver';
import { StageArtistService } from './stage-artist.service';

@Module({
  providers: [StageArtistResolver, StageArtistService],
})
export class StageArtistModule {}
