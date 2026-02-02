import { ArgsType, Field } from '@nestjs/graphql';
import {
  EventOrganizerReferrerOrderByWithRelationInput,
  EventOrganizerReferrerWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class EventOrganizerReferrersArgs extends ConnectionArgs {
  @Field(() => EventOrganizerReferrerWhereInput, { nullable: true })
  where?: EventOrganizerReferrerWhereInput;

  @Field(() => [EventOrganizerReferrerOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: Array<EventOrganizerReferrerOrderByWithRelationInput>;
}
