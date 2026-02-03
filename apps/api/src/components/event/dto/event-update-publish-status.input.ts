import { Field, ID, InputType } from '@nestjs/graphql';
import { EventPublishStatus } from 'src/generated/prisma-nestjs-graphql';

@InputType()
export class EventUpdatePublishStatusInput {
  @Field(() => ID)
  id!: string;

  @Field(() => EventPublishStatus)
  publishStatus!: EventPublishStatus;
}
