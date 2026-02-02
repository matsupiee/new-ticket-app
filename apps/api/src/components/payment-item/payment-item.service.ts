import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { PaymentItem } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaymentItemsArgs } from './dto/payment-items.args';
import { PaymentItemConnection } from './dto/payment-item.connection';

@Injectable()
export class PaymentItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<PaymentItem | null> {
    return this.prisma.paymentItem.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: PaymentItemsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<PaymentItemConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.paymentItem.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.paymentItem.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
