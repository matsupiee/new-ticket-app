import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { UserRestriction } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { UserRestrictionsArgs } from './dto/user-restrictions.args';
import { UserRestrictionConnection } from './dto/user-restriction.connection';

@Injectable()
export class UserRestrictionService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<UserRestriction | null> {
    return this.prisma.userRestriction.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: UserRestrictionsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<UserRestrictionConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.userRestriction.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.userRestriction.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
