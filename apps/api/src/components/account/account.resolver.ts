import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { Account } from 'src/generated/prisma-nestjs-graphql';
import { AccountConnection } from './dto/account.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { AccountsArgs } from './dto/accounts.args';
import { AccountService } from './account.service';

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => Account, {
    description: 'アカウントを1件取得する',
    nullable: true,
  })
  async account(@Args('id', { type: () => ID }) id: string) {
    return this.accountService.findOne(id);
  }

  @Query(() => AccountConnection, {
    description: 'アカウントを複数取得する',
  })
  async accounts(
    @Args() args: AccountsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<AccountConnection> {
    return this.accountService.findMany(args, resolveInfo);
  }
}
