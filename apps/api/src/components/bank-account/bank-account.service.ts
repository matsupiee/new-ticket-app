import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { BankAccount } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { BankAccountsArgs } from './dto/bank-accounts.args';
import { BankAccountConnection } from './dto/bank-account.connection';

@Injectable()
export class BankAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<BankAccount | null> {
    await this.prisma.bankAccount.findMany({
      where: {
        bankName: {
          contains: '三菱UFJ銀行',
        },
      },
      include: {
        eventOrganizer: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.prisma.bankAccount.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: BankAccountsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<BankAccountConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.bankAccount.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.bankAccount.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
