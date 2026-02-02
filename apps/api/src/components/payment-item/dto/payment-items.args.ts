import { ArgsType, Field } from '@nestjs/graphql';
import {
  PaymentItemOrderByWithRelationInput,
  PaymentItemWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class PaymentItemsArgs extends ConnectionArgs {
  @Field(() => PaymentItemWhereInput, { nullable: true })
  where?: PaymentItemWhereInput;

  @Field(() => [PaymentItemOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<PaymentItemOrderByWithRelationInput>;
}
