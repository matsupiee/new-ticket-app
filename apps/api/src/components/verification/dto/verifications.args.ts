import { ArgsType, Field } from '@nestjs/graphql';
import {
  VerificationOrderByWithRelationInput,
  VerificationWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class VerificationsArgs extends ConnectionArgs {
  @Field(() => VerificationWhereInput, { nullable: true })
  where?: VerificationWhereInput;

  @Field(() => [VerificationOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<VerificationOrderByWithRelationInput>;
}
