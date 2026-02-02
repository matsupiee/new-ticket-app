import { ArgsType, Field } from '@nestjs/graphql';
import {
  PaymentCardOrderByWithRelationInput,
  PaymentCardWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class PaymentCardsArgs extends ConnectionArgs {
  @Field(() => PaymentCardWhereInput, { nullable: true })
  where?: PaymentCardWhereInput;

  @Field(() => [PaymentCardOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<PaymentCardOrderByWithRelationInput>;
}
