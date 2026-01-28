import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class EventCreatePayload {
  @Field(() => Event)
  event!: Event;
}
