import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { Payment } from 'src/generated/prisma-nestjs-graphql';
import { PaymentConnection } from './dto/payment.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { PaymentsArgs } from './dto/payments.args';
import { PaymentService } from './payment.service';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => Payment, {
    description: '支払いを1件取得する',
    nullable: true,
  })
  async payment(@Args('id', { type: () => ID }) id: string) {
    return this.paymentService.findOne(id);
  }

  @Query(() => PaymentConnection, {
    description: '支払いを複数取得する',
  })
  async payments(
    @Args() args: PaymentsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<PaymentConnection> {
    return this.paymentService.findMany(args, resolveInfo);
  }
}
