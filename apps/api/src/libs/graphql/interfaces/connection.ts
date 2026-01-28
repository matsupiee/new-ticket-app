import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Connection as PrismaRelayConnection,
  ConnectionArguments as PrismaRelayConnectionArguments,
  Edge as PrismaRelayEdge,
  PageInfo as PrismaRelayPageInfo,
} from '@devoxa/prisma-relay-cursor-connection';

export function Connection<T>(GenericClass?: Type<T>) {
  @ObjectType(`${GenericClass?.name}PageInfo`)
  class PageInfo implements PrismaRelayPageInfo {
    @Field(() => Boolean, { nullable: false })
    hasNextPage!: boolean;

    @Field(() => Boolean, { nullable: false })
    hasPreviousPage!: boolean;

    @Field(() => String, { nullable: true })
    startCursor?: string;

    @Field(() => String, { nullable: true })
    endCursor?: string;
  }

  @ObjectType(`${GenericClass?.name}Edge`)
  class Edge<T> implements PrismaRelayEdge<T> {
    @Field(() => String, { nullable: false })
    cursor!: string;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    @Field(() => GenericClass!, { nullable: false })
    node!: T;
  }

  @ObjectType({ isAbstract: true })
  class IConnection implements PrismaRelayConnection<T> {
    @Field(() => [GenericClass], { nullable: false })
    nodes!: T[];

    @Field(() => [Edge], { nullable: false })
    edges!: Edge<T>[];

    @Field(() => PageInfo, { nullable: false })
    pageInfo!: PageInfo;

    @Field(() => Int, { nullable: false })
    totalCount!: number;
  }

  return IConnection;
}

@ArgsType()
export class ConnectionArgs implements PrismaRelayConnectionArguments {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => Int, { nullable: true })
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}

@ArgsType()
export class ConnectionResolveFieldArgs implements PrismaRelayConnectionArguments {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string;
}

/**
 * GraphQL ResolveFieldのargsを、PrismaのFluent APIに渡せる形式に変換します。
 *
 * @param args - GraphQL ResolveFieldに渡される引数。
 *  'first'（取得するレコードの数）, 'after'（レコードを取得する開始位置のカーソル）, その他のクエリ引数などを含みます。
 */
export function resolveFieldArgsToPrisma<
  Args extends ConnectionResolveFieldArgs,
>(args: Args) {
  const { first, after, ...queryArgs } = args;
  const cursor = after ? { id: after } : undefined;
  return {
    take: first,
    cursor,
    ...queryArgs,
  };
}
