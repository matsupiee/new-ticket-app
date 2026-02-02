import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Account } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { AccountsArgs } from './dto/accounts.args';
import { AccountConnection } from './dto/account.connection';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Account | null> {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: AccountsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<AccountConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.account.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.account.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
