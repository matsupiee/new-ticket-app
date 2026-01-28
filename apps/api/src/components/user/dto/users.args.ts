import { ArgsType, Field } from '@nestjs/graphql';
import {
  UserOrderByWithRelationInput,
  UserWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class UsersArgs extends ConnectionArgs {
  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @Field(() => [UserOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UserOrderByWithRelationInput>;
}
