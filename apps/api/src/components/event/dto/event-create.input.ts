import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventCreateInput {
  @Field(() => String)
  title!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  venue!: string;

  @Field(() => Date)
  date!: Date;
}
