import { Args, ID, Info, Query, Resolver } from '@nestjs/graphql';
import { Verification } from 'src/generated/prisma-nestjs-graphql';
import { VerificationConnection } from './dto/verification.connection';
import { type GraphQLResolveInfo } from 'graphql';
import { VerificationsArgs } from './dto/verifications.args';
import { VerificationService } from './verification.service';

@Resolver(() => Verification)
export class VerificationResolver {
  constructor(private readonly verificationService: VerificationService) {}

  @Query(() => Verification, {
    description: '認証情報を1件取得する',
    nullable: true,
  })
  async verification(@Args('id', { type: () => ID }) id: string) {
    return this.verificationService.findOne(id);
  }

  @Query(() => VerificationConnection, {
    description: '認証情報を複数取得する',
  })
  async verifications(
    @Args() args: VerificationsArgs,
    @Info() resolveInfo: GraphQLResolveInfo,
  ): Promise<VerificationConnection> {
    return this.verificationService.findMany(args, resolveInfo);
  }
}
