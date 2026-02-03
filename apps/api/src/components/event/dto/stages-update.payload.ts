import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class StagesUpdatePayload {
  @Field(() => Event)
  event!: Event;
}
