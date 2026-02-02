import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { PaymentItem } from 'src/generated/prisma-nestjs-graphql';
import { PaymentItemConnection } from './dto/payment-item.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { PaymentItemsArgs } from './dto/payment-items.args';
import { PaymentItemService } from './payment-item.service';

@Resolver(() => PaymentItem)
export class PaymentItemResolver {
  constructor(private readonly paymentItemService: PaymentItemService) {}

  @Query(() => PaymentItem, {
    description: '支払いアイテムを1件取得する',
    nullable: true,
  })
  async paymentItem(@Args('id', { type: () => ID }) id: string) {
    return this.paymentItemService.findOne(id);
  }

  @Query(() => PaymentItemConnection, {
    description: '支払いアイテムを複数取得する',
  })
  async paymentItems(
    @Args() args: PaymentItemsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<PaymentItemConnection> {
    return this.paymentItemService.findMany(args, resolveInfo);
  }
}
