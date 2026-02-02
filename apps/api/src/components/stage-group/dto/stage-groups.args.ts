import { ArgsType, Field } from '@nestjs/graphql';
import {
  StageGroupOrderByWithRelationInput,
  StageGroupWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class StageGroupsArgs extends ConnectionArgs {
  @Field(() => StageGroupWhereInput, { nullable: true })
  where?: StageGroupWhereInput;

  @Field(() => [StageGroupOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<StageGroupOrderByWithRelationInput>;
}
