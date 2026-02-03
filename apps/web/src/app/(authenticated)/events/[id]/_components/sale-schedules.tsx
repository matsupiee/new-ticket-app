'use client';

import { format } from 'date-fns';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Pencil, Plus } from 'lucide-react';

type TicketType = {
  id: string;
  name: string;
  description: string | null;
  seatType: string | null;
  basePrice: number;
  capacity: number;
  maxNumPerApply: number;
  isOnceApplyOnly: boolean | null;
  isOnlyQrCodeEntry: boolean | null;
};

type SaleSchedule = {
  id: string;
  name: string;
  description: string | null;
  saleType: string | null;
  publishAt: string | null;
  saleStartAt: string;
  saleEndAt: string;
  lotteryMode: string | null;
  lotteryStartAt: string | null;
  lotteryResultAnnounceAt: string | null;
  isSmsAuthRequired: boolean | null;
  publishStatus: string | null;
  ticketTypes: TicketType[] | null;
};

type SaleSchedulesProps = {
  saleSchedules: SaleSchedule[];
  readOnly?: boolean;
  onEditSaleSchedule?: (scheduleId: string) => void;
  onCreateTicketType?: (scheduleId: string) => void;
  onEditTicketType?: (ticketTypeId: string) => void;
};

const getSeatTypeLabel = (seatType: string | null): string => {
  if (!seatType) return '-';

  switch (seatType) {
    case 'FREE':
      return '自由';
    case 'RESERVED':
      return '指定席';
    case 'ENTRY_NUMBER':
      return '整理番号';
    default:
      return seatType;
  }
};

export function SaleSchedules({
  saleSchedules,
  readOnly = false,
  onEditSaleSchedule,
  onCreateTicketType,
  onEditTicketType,
}: SaleSchedulesProps) {
  if (!saleSchedules || saleSchedules.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">チケット情報がありません</p>
    );
  }

  return (
    <div className="space-y-6">
      {saleSchedules.map((saleSchedule) => {
        const saleStart = new Date(saleSchedule.saleStartAt);
        const saleEnd = new Date(saleSchedule.saleEndAt);
        const lotteryStart = saleSchedule.lotteryStartAt
          ? new Date(saleSchedule.lotteryStartAt)
          : null;
        const lotteryResultAnnounce = saleSchedule.lotteryResultAnnounceAt
          ? new Date(saleSchedule.lotteryResultAnnounceAt)
          : null;

        return (
          <div
            key={saleSchedule.id}
            className="border rounded-lg p-4 bg-gray-50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {saleSchedule.name}
                </h3>
                {saleSchedule.publishStatus === 'PUBLISHED' ? (
                  <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                    公開中
                  </Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-500 border-gray-200 mt-1">
                    下書き
                  </Badge>
                )}
              </div>
              {!readOnly && onEditSaleSchedule && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditSaleSchedule(saleSchedule.id)}
                >
                  <Pencil className="size-4 mr-2" />
                  編集する
                </Button>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">募集期間: </span>
                <span className="text-gray-900">
                  {format(saleStart, 'yyyy/MM/dd HH:mm')} ~{' '}
                  {format(saleEnd, 'MM/dd HH:mm')}
                </span>
              </div>

              {lotteryStart && (
                <div>
                  <span className="text-gray-600">抽選予定日時: </span>
                  <span className="text-gray-900">
                    {format(lotteryStart, 'yyyy/MM/dd HH:mm')}
                  </span>
                </div>
              )}

              {lotteryResultAnnounce && (
                <div>
                  <span className="text-gray-600">抽選結果発表日時: </span>
                  <span className="text-gray-900">
                    {format(lotteryResultAnnounce, 'yyyy/MM/dd HH:mm')}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">チケット種別</h4>
                {!readOnly && onCreateTicketType && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCreateTicketType(saleSchedule.id)}
                  >
                    <Plus className="size-3 mr-1" />
                    券種を追加
                  </Button>
                )}
              </div>
              {saleSchedule.ticketTypes &&
              saleSchedule.ticketTypes.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 text-gray-700">
                          券名
                        </th>
                        <th className="text-left py-2 px-3 text-gray-700">
                          座席タイプ
                        </th>
                        <th className="text-right py-2 px-3 text-gray-700">
                          価格
                        </th>
                        <th className="text-right py-2 px-3 text-gray-700">
                          枠数
                        </th>
                        <th className="text-right py-2 px-3 text-gray-700">
                          制限
                        </th>
                        {!readOnly && (
                          <th className="text-right py-2 px-3 text-gray-700"></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {saleSchedule.ticketTypes.map((ticketType) => (
                        <tr
                          key={ticketType.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="py-2 px-3 text-gray-900">
                            {ticketType.name}
                          </td>
                          <td className="py-2 px-3 text-gray-900">
                            {getSeatTypeLabel(ticketType.seatType)}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-900">
                            ¥{ticketType.basePrice.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-900">
                            {ticketType.capacity.toLocaleString()}
                          </td>
                          <td className="py-2 px-3 text-right text-gray-900">
                            {ticketType.maxNumPerApply}枚まで
                          </td>
                          {!readOnly && onEditTicketType && (
                            <td className="py-2 px-3 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditTicketType(ticketType.id)}
                              >
                                <Pencil className="size-3" />
                              </Button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  券種が登録されていません
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
