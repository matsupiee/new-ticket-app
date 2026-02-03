import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class VenueCreateInput {
  @Field(() => String)
  name!: string;
}
