import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { PaymentCard } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaymentCardsArgs } from './dto/payment-cards.args';
import { PaymentCardConnection } from './dto/payment-card.connection';

@Injectable()
export class PaymentCardService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<PaymentCard | null> {
    return this.prisma.paymentCard.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: PaymentCardsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<PaymentCardConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.paymentCard.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.paymentCard.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
