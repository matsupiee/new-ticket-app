import { ArgsType, Field } from '@nestjs/graphql';
import {
  FeaturedEventOrderByWithRelationInput,
  FeaturedEventWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class FeaturedEventsArgs extends ConnectionArgs {
  @Field(() => FeaturedEventWhereInput, { nullable: true })
  where?: FeaturedEventWhereInput;

  @Field(() => [FeaturedEventOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<FeaturedEventOrderByWithRelationInput>;
}
