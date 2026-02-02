import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/generated/prisma-nestjs-graphql';
import { UserConnection } from './dto/user.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { UsersArgs } from './dto/users.args';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, {
    description: '[Shared]: Userを取得する',
    nullable: true,
  })
  async user(@Args('id', { type: () => ID, nullable: true }) id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => UserConnection, {
    description: '[Admin]:Userを複数取得する',
  })
  async users(
    @Args() args: UsersArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<UserConnection> {
    return this.userService.findMany(args, resolveInfo);
  }
}
