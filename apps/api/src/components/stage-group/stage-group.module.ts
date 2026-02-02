import { Module } from '@nestjs/common';
import { StageGroupResolver } from './stage-group.resolver';
import { StageGroupService } from './stage-group.service';

@Module({
  providers: [StageGroupResolver, StageGroupService],
})
export class StageGroupModule {}
