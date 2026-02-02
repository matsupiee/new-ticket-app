import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { AvailablePaymentMethod } from 'src/generated/prisma-nestjs-graphql';
import { AvailablePaymentMethodConnection } from './dto/available-payment-method.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { AvailablePaymentMethodsArgs } from './dto/available-payment-methods.args';
import { AvailablePaymentMethodService } from './available-payment-method.service';

@Resolver(() => AvailablePaymentMethod)
export class AvailablePaymentMethodResolver {
  constructor(
    private readonly availablePaymentMethodService: AvailablePaymentMethodService,
  ) {}

  @Query(() => AvailablePaymentMethod, {
    description: '利用可能な支払い方法を1件取得する',
    nullable: true,
  })
  async availablePaymentMethod(@Args('id', { type: () => ID }) id: string) {
    return this.availablePaymentMethodService.findOne(id);
  }

  @Query(() => AvailablePaymentMethodConnection, {
    description: '利用可能な支払い方法を複数取得する',
  })
  async availablePaymentMethods(
    @Args() args: AvailablePaymentMethodsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<AvailablePaymentMethodConnection> {
    return this.availablePaymentMethodService.findMany(args, resolveInfo);
  }
}
