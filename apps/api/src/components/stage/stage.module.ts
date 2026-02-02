import { Module } from '@nestjs/common';
import { StageResolver } from './stage.resolver';
import { StageService } from './stage.service';

@Module({
  providers: [StageResolver, StageService],
})
export class StageModule {}
