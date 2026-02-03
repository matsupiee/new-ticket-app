import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArtistCreateInput {
  @Field(() => String)
  name!: string;
}
