import { ArgsType, Field } from '@nestjs/graphql';
import {
  UserRestrictionOrderByWithRelationInput,
  UserRestrictionWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class UserRestrictionsArgs extends ConnectionArgs {
  @Field(() => UserRestrictionWhereInput, { nullable: true })
  where?: UserRestrictionWhereInput;

  @Field(() => [UserRestrictionOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<UserRestrictionOrderByWithRelationInput>;
}
