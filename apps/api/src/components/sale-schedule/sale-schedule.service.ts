import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { SaleSchedule } from 'src/generated/prisma-nestjs-graphql';
import { type GraphQLResolveInfo } from 'graphql';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { SaleSchedulesArgs } from './dto/sale-schedules.args';
import { SaleScheduleConnection } from './dto/sale-schedule.connection';
import { SaleScheduleUpdateInput } from './dto/sale-schedule-update.input';
import { SaleScheduleCreateInput } from './dto/sale-schedule-create.input';

@Injectable()
export class SaleScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string): Promise<SaleSchedule | null> {
    return this.prisma.saleSchedule.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: SaleSchedulesArgs,
    resolveInfo: GraphQLResolveInfo,
  ): Promise<SaleScheduleConnection> {
    const { where, orderBy, ...connectionArgs } = args;
    const argsQuery = { where, orderBy };
    return findManyCursorConnection(
      (_args) =>
        this.prisma.saleSchedule.findMany({
          ..._args,
          ...argsQuery,
        }),
      () => this.prisma.saleSchedule.count({ where, orderBy }),
      connectionArgs,
      { resolveInfo },
    );
  }

  async create(input: SaleScheduleCreateInput): Promise<SaleSchedule> {
    // イベントを取得してバリデーション
    const event = await this.prisma.event.findUnique({
      where: { id: input.eventId },
      include: {
        stages: {
          orderBy: { startAt: 'asc' },
        },
      },
    });

    if (!event) {
      throw new BadRequestException('イベントが見つかりません');
    }

    // イベントの最初のステージの開演日時を取得（最も早い開演日時）
    const earliestStageStartAt =
      event.stages.length > 0 ? event.stages[0]!.startAt : null;

    // バリデーション: 販売開始日時は開演日以前であること
    if (earliestStageStartAt && input.saleStartAt > earliestStageStartAt) {
      throw new BadRequestException(
        '販売開始日時は開演日以前である必要があります',
      );
    }

    // バリデーション: 販売終了日時は開演日以前であること
    if (earliestStageStartAt && input.saleEndAt > earliestStageStartAt) {
      throw new BadRequestException(
        '販売終了日時は開演日以前である必要があります',
      );
    }

    // バリデーション: 販売終了日時は販売開始日時以降であること
    if (input.saleEndAt < input.saleStartAt) {
      throw new BadRequestException(
        '販売終了日時は販売開始日時以降である必要があります',
      );
    }

    // 既存のスケジュール数を取得してsortOrderを設定
    const existingCount = await this.prisma.saleSchedule.count({
      where: { eventId: input.eventId },
    });

    return this.prisma.saleSchedule.create({
      data: {
        eventId: input.eventId,
        name: input.name,
        description: input.description,
        saleType: input.saleType,
        publishAt: input.publishAt,
        saleStartAt: input.saleStartAt,
        saleEndAt: input.saleEndAt,
        lotteryMode: input.saleType === 'LOTTERY' ? input.lotteryMode : null,
        lotteryStartAt:
          input.saleType === 'LOTTERY' ? input.lotteryStartAt : null,
        lotteryResultAnnounceAt:
          input.saleType === 'LOTTERY' ? input.lotteryResultAnnounceAt : null,
        isSmsAuthRequired: input.isSmsAuthRequired ?? false,
        sortOrder: existingCount,
        transferPolicy: 'FREE',
        publishStatus: 'UNPUBLISHED',
        maxPerApplication: 4,
      },
    });
  }

  async update(input: SaleScheduleUpdateInput): Promise<SaleSchedule> {
    // 既存のスケジュールを取得
    const existingSchedule = await this.prisma.saleSchedule.findUnique({
      where: { id: input.id },
      include: {
        event: {
          include: {
            stages: {
              orderBy: { startAt: 'asc' },
            },
          },
        },
      },
    });

    if (!existingSchedule) {
      throw new BadRequestException('販売スケジュールが見つかりません');
    }

    // バリデーション: スケジュールが公開中ステータスの場合はいじれない
    if (existingSchedule.publishStatus === 'PUBLISHED') {
      throw new BadRequestException('公開中のスケジュールは編集できません');
    }

    // イベントの最初のステージの開演日時を取得（最も早い開演日時）
    const earliestStageStartAt =
      existingSchedule.event.stages.length > 0
        ? existingSchedule.event.stages[0]!.startAt
        : null;

    // 更新データの準備
    const updateData: any = {};

    if (input.name !== undefined) {
      updateData.name = input.name;
    }
    if (input.description !== undefined) {
      updateData.description = input.description;
    }
    if (input.saleType !== undefined) {
      updateData.saleType = input.saleType;
      // 抽選方式が先着に変更された場合、抽選関連フィールドをクリア
      if (input.saleType === 'FIRST_COME') {
        updateData.lotteryMode = null;
        updateData.lotteryStartAt = null;
        updateData.lotteryResultAnnounceAt = null;
      }
    }
    if (input.publishAt !== undefined) {
      updateData.publishAt = input.publishAt;
    }
    if (input.saleStartAt !== undefined) {
      updateData.saleStartAt = input.saleStartAt;
    }
    if (input.saleEndAt !== undefined) {
      updateData.saleEndAt = input.saleEndAt;
    }
    if (input.lotteryMode !== undefined) {
      updateData.lotteryMode = input.lotteryMode;
    }
    if (input.lotteryStartAt !== undefined) {
      updateData.lotteryStartAt = input.lotteryStartAt;
    }
    if (input.lotteryResultAnnounceAt !== undefined) {
      updateData.lotteryResultAnnounceAt = input.lotteryResultAnnounceAt;
    }
    if (input.isSmsAuthRequired !== undefined) {
      updateData.isSmsAuthRequired = input.isSmsAuthRequired;
    }

    // バリデーション: 販売開始日時は開演日以前であること
    const saleStartAt = input.saleStartAt ?? existingSchedule.saleStartAt;
    if (earliestStageStartAt && saleStartAt > earliestStageStartAt) {
      throw new BadRequestException(
        '販売開始日時は開演日以前である必要があります',
      );
    }

    // バリデーション: 販売終了日時は開演日以前であること
    const saleEndAt = input.saleEndAt ?? existingSchedule.saleEndAt;
    if (earliestStageStartAt && saleEndAt > earliestStageStartAt) {
      throw new BadRequestException(
        '販売終了日時は開演日以前である必要があります',
      );
    }

    // バリデーション: 販売終了日時は販売開始日時以降であること
    if (saleEndAt < saleStartAt) {
      throw new BadRequestException(
        '販売終了日時は販売開始日時以降である必要があります',
      );
    }

    return this.prisma.saleSchedule.update({
      where: { id: input.id },
      data: updateData,
    });
  }
}
