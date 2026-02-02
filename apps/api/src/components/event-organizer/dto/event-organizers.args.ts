import { ArgsType, Field } from '@nestjs/graphql';
import {
  EventOrganizerOrderByWithRelationInput,
  EventOrganizerWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class EventOrganizersArgs extends ConnectionArgs {
  @Field(() => EventOrganizerWhereInput, { nullable: true })
  where?: EventOrganizerWhereInput;

  @Field(() => [EventOrganizerOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<EventOrganizerOrderByWithRelationInput>;
}
