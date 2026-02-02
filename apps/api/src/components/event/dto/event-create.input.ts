import { Field, InputType } from '@nestjs/graphql';

@InputType()
class StageInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  venueName!: string;

  @Field(() => Date, { nullable: true })
  doorsOpenAt?: Date;

  @Field(() => Date)
  startAt!: Date;

  @Field(() => Date, { nullable: true })
  endAt?: Date;

  @Field(() => [String])
  artistNames!: string[];
}

@InputType()
export class EventCreateInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [String], { nullable: true })
  thumbnailUrls?: string[];

  @Field(() => String, { nullable: true })
  lineThumbnailUrl?: string;

  @Field(() => Date)
  startAt!: Date;

  @Field(() => Date)
  endAt!: Date;

  @Field(() => String)
  eventOrganizerId!: string;

  @Field(() => String)
  inquiryName!: string;

  @Field(() => String)
  inquiryAddress!: string;

  @Field(() => [StageInput])
  stages!: StageInput[];
}
