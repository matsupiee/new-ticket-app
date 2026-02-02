import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { PaymentCard } from 'src/generated/prisma-nestjs-graphql';
import { PaymentCardConnection } from './dto/payment-card.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { PaymentCardsArgs } from './dto/payment-cards.args';
import { PaymentCardService } from './payment-card.service';

@Resolver(() => PaymentCard)
export class PaymentCardResolver {
  constructor(private readonly paymentCardService: PaymentCardService) {}

  @Query(() => PaymentCard, {
    description: '支払いカードを1件取得する',
    nullable: true,
  })
  async paymentCard(@Args('id', { type: () => ID }) id: string) {
    return this.paymentCardService.findOne(id);
  }

  @Query(() => PaymentCardConnection, {
    description: '支払いカードを複数取得する',
  })
  async paymentCards(
    @Args() args: PaymentCardsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<PaymentCardConnection> {
    return this.paymentCardService.findMany(args, resolveInfo);
  }
}
