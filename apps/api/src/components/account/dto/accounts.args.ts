import { ArgsType, Field } from '@nestjs/graphql';
import {
  AccountOrderByWithRelationInput,
  AccountWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class AccountsArgs extends ConnectionArgs {
  @Field(() => AccountWhereInput, { nullable: true })
  where?: AccountWhereInput;

  @Field(() => [AccountOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<AccountOrderByWithRelationInput>;
}
