import { Field, ObjectType } from '@nestjs/graphql';
import { Venue } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class VenueCreatePayload {
  @Field(() => Venue)
  venue!: Venue;
}
