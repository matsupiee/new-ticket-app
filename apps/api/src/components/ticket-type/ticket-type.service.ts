import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { TicketType } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { TicketTypesArgs } from './dto/ticket-types.args';
import { TicketTypeConnection } from './dto/ticket-type.connection';
import { TicketTypeUpdateInput } from './dto/ticket-type-update.input';

@Injectable()
export class TicketTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<TicketType | null> {
    return this.prisma.ticketType.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: TicketTypesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<TicketTypeConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.ticketType.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.ticketType.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }

  async update(input: TicketTypeUpdateInput): Promise<TicketType> {
    const existing = await this.prisma.ticketType.findUnique({
      where: { id: input.id },
    });

    if (!existing) {
      throw new BadRequestException('チケットタイプが見つかりません');
    }

    const { id, ...updateFields } = input;

    const updateData: Partial<
      Omit<TicketTypeUpdateInput, 'id'>
    > = {};

    for (const [key, value] of Object.entries(updateFields)) {
      if (value !== undefined) {
        (updateData as Record<string, unknown>)[key] = value;
      }
    }

    return this.prisma.ticketType.update({
      where: { id },
      data: updateData,
    });
  }
}
