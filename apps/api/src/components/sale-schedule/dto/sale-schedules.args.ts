import { ArgsType, Field } from '@nestjs/graphql';
import {
  SaleScheduleOrderByWithRelationInput,
  SaleScheduleWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class SaleSchedulesArgs extends ConnectionArgs {
  @Field(() => SaleScheduleWhereInput, { nullable: true })
  where?: SaleScheduleWhereInput;

  @Field(() => [SaleScheduleOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<SaleScheduleOrderByWithRelationInput>;
}
