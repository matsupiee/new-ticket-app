import { ArgsType, Field } from '@nestjs/graphql';
import {
  EventOrganizerFeatureOrderByWithRelationInput,
  EventOrganizerFeatureWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class EventOrganizerFeaturesArgs extends ConnectionArgs {
  @Field(() => EventOrganizerFeatureWhereInput, { nullable: true })
  where?: EventOrganizerFeatureWhereInput;

  @Field(() => [EventOrganizerFeatureOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: Array<EventOrganizerFeatureOrderByWithRelationInput>;
}
