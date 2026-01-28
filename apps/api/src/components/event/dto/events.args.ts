import { ArgsType, Field } from '@nestjs/graphql';
import {
  EventOrderByWithRelationInput,
  EventWhereInput,
} from 'src/generated/prisma-nestjs-graphql';
import { ConnectionArgs } from 'src/libs/graphql/interfaces/connection';

@ArgsType()
export class EventsArgs extends ConnectionArgs {
  @Field(() => EventWhereInput, { nullable: true })
  where?: EventWhereInput;

  @Field(() => [EventOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<EventOrderByWithRelationInput>;
}
