import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { UserRestriction } from 'src/generated/prisma-nestjs-graphql';
import { UserRestrictionConnection } from './dto/user-restriction.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { UserRestrictionsArgs } from './dto/user-restrictions.args';
import { UserRestrictionService } from './user-restriction.service';

@Resolver(() => UserRestriction)
export class UserRestrictionResolver {
  constructor(
    private readonly userRestrictionService: UserRestrictionService,
  ) {}

  @Query(() => UserRestriction, {
    description: 'ユーザー制限を1件取得する',
    nullable: true,
  })
  async userRestriction(@Args('id', { type: () => ID }) id: string) {
    return this.userRestrictionService.findOne(id);
  }

  @Query(() => UserRestrictionConnection, {
    description: 'ユーザー制限を複数取得する',
  })
  async userRestrictions(
    @Args() args: UserRestrictionsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<UserRestrictionConnection> {
    return this.userRestrictionService.findMany(args, resolveInfo);
  }
}
