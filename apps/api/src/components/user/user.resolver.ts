import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/generated/prisma-nestjs-graphql';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { UserConnection } from './dto/user.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { UsersArgs } from './dto/users.args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => User, {
    description: '[Shared]: Userを取得する',
    nullable: true,
  })
  async user(@Args('id', { type: () => ID, nullable: true }) id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  @Query(() => UserConnection, {
    description: '[Admin]:Userを複数取得する',
  })
  async users(
    @Args() args: UsersArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<UserConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) => this.prisma.user.findMany({ ..._args, ...argsQuery }),
      () => this.prisma.user.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
