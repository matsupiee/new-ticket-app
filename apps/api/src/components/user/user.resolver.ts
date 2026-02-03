import {
  Args,
  ID,
  Info,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FavoriteArtist, User } from 'src/generated/prisma-nestjs-graphql';
import { UserConnection } from './dto/user.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { UsersArgs } from './dto/users.args';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

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

  @ResolveField(() => [FavoriteArtist])
  async favoriteArtists(@Parent() user: User) {
    return await this.prisma.user
      .findUnique({
        where: { id: user.id },
      })
      .favoriteArtists();
  }
}
