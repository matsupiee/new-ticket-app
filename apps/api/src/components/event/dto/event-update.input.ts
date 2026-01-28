import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class EventUpdateInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  venue?: string;

  @Field(() => Date, { nullable: true })
  date?: Date;
}
