import { Field, ObjectType } from '@nestjs/graphql';
import { Stage } from 'src/generated/prisma-nestjs-graphql';

@ObjectType()
export class StagesUpdatePayload {
  @Field(() => [Stage])
  stages!: Stage[];
}
