import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { User } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { UsersArgs } from './dto/users.args';
import { UserConnection } from './dto/user.connection';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string | null): Promise<User | null> {
    if (!id) {
      return null;
    }
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: UsersArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<UserConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) => this.prisma.user.findMany({ ..._args, ...argsQuery }),
      () => this.prisma.user.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
