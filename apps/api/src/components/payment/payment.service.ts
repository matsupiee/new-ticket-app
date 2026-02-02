import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Payment } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { PaymentsArgs } from './dto/payments.args';
import { PaymentConnection } from './dto/payment.connection';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Payment | null> {
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: PaymentsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<PaymentConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.payment.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.payment.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
