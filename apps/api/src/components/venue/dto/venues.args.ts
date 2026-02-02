import { ArgsType, Field } from '@nestjs/graphql';
import {
  VenueOrderByWithRelationInput,
  VenueWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class VenuesArgs extends ConnectionArgs {
  @Field(() => VenueWhereInput, { nullable: true })
  where?: VenueWhereInput;

  @Field(() => [VenueOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<VenueOrderByWithRelationInput>;
}
