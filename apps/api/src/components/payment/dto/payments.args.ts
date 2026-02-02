import { ArgsType, Field } from '@nestjs/graphql';
import {
  PaymentOrderByWithRelationInput,
  PaymentWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class PaymentsArgs extends ConnectionArgs {
  @Field(() => PaymentWhereInput, { nullable: true })
  where?: PaymentWhereInput;

  @Field(() => [PaymentOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<PaymentOrderByWithRelationInput>;
}
