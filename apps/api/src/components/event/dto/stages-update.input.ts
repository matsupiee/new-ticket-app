import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
class StageUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  venueName?: string;

  @Field(() => Date, { nullable: true })
  doorsOpenAt?: Date;

  @Field(() => Date, { nullable: true })
  startAt?: Date;

  @Field(() => [String], { nullable: true })
  artistNames?: string[];
}

@InputType()
export class StagesUpdateInput {
  @Field(() => ID)
  eventId!: string;

  @Field(() => [StageUpdateInput])
  stages!: StageUpdateInput[];
}
