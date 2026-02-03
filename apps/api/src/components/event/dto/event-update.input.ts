import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class EventUpdateInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  thumbnailUrls?: string[];

  @Field(() => String, { nullable: true })
  lineThumbnailUrl?: string;

  @Field(() => String, { nullable: true })
  inquiry?: string;
}
