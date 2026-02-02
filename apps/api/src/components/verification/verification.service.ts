import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Verification } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { VerificationsArgs } from './dto/verifications.args';
import { VerificationConnection } from './dto/verification.connection';

@Injectable()
export class VerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Verification | null> {
    return this.prisma.verification.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: VerificationsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<VerificationConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.verification.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.verification.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
