import { Module } from '@nestjs/common';
import { UserRestrictionResolver } from './user-restriction.resolver';
import { UserRestrictionService } from './user-restriction.service';

@Module({
  providers: [UserRestrictionResolver, UserRestrictionService],
})
export class UserRestrictionModule {}
