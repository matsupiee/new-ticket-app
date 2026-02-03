import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
class StageUpdateInput {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  venueId?: string;

  @Field(() => Date, { nullable: true })
  doorsOpenAt?: Date;

  @Field(() => Date, { nullable: true })
  startAt?: Date;

  @Field(() => [String], { nullable: true })
  artistIds?: string[];
}

@InputType()
export class StagesUpdateInput {
  @Field(() => ID)
  eventId!: string;

  @Field(() => [StageUpdateInput])
  stages!: StageUpdateInput[];
}
