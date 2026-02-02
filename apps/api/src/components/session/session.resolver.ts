import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { Session } from 'src/generated/prisma-nestjs-graphql';
import { SessionConnection } from './dto/session.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { SessionsArgs } from './dto/sessions.args';
import { SessionService } from './session.service';

@Resolver(() => Session)
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Query(() => Session, {
    description: 'セッションを1件取得する',
    nullable: true,
  })
  async session(@Args('id', { type: () => ID }) id: string) {
    return this.sessionService.findOne(id);
  }

  @Query(() => SessionConnection, {
    description: 'セッションを複数取得する',
  })
  async sessions(
    @Args() args: SessionsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<SessionConnection> {
    return this.sessionService.findMany(args, resolveInfo);
  }
}
