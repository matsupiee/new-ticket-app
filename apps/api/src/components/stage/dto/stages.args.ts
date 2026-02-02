import { ArgsType, Field } from '@nestjs/graphql';
import {
  StageOrderByWithRelationInput,
  StageWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class StagesArgs extends ConnectionArgs {
  @Field(() => StageWhereInput, { nullable: true })
  where?: StageWhereInput;

  @Field(() => [StageOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<StageOrderByWithRelationInput>;
}
