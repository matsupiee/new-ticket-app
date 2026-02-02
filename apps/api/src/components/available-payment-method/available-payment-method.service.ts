import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { AvailablePaymentMethod } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { AvailablePaymentMethodsArgs } from './dto/available-payment-methods.args';
import { AvailablePaymentMethodConnection } from './dto/available-payment-method.connection';

@Injectable()
export class AvailablePaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<AvailablePaymentMethod | null> {
    return this.prisma.availablePaymentMethod.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: AvailablePaymentMethodsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<AvailablePaymentMethodConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.availablePaymentMethod.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.availablePaymentMethod.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
