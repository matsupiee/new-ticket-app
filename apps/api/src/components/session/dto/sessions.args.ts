import { ArgsType, Field } from '@nestjs/graphql';
import {
  SessionOrderByWithRelationInput,
  SessionWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class SessionsArgs extends ConnectionArgs {
  @Field(() => SessionWhereInput, { nullable: true })
  where?: SessionWhereInput;

  @Field(() => [SessionOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<SessionOrderByWithRelationInput>;
}
