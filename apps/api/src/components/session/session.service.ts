import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { Session } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { SessionsArgs } from './dto/sessions.args';
import { SessionConnection } from './dto/session.connection';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<Session | null> {
    return this.prisma.session.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: SessionsArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<SessionConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.session.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.session.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }
}
