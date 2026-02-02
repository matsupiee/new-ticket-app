import { ArgsType, Field } from '@nestjs/graphql';
import {
  AvailablePaymentMethodOrderByWithRelationInput,
  AvailablePaymentMethodWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class AvailablePaymentMethodsArgs extends ConnectionArgs {
  @Field(() => AvailablePaymentMethodWhereInput, { nullable: true })
  where?: AvailablePaymentMethodWhereInput;

  @Field(() => [AvailablePaymentMethodOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: Array<AvailablePaymentMethodOrderByWithRelationInput>;
}
