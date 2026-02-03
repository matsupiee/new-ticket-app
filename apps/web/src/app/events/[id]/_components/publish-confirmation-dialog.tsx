'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { SaleSchedules } from './sale-schedules';

type Stage = {
  id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  venueName: string;
  artists: string[];
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
  ticketTypes: Array<{
    id: string;
    name: string;
    description: string | null;
    seatType: string | null;
    basePrice: number;
    capacity: number;
    maxNumPerApply: number;
    isOnceApplyOnly: boolean | null;
    isOnlyQrCodeEntry: boolean | null;
  }> | null;
};

export function PublishConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  event,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  event: {
    id: string;
    name: string;
    description?: string;
    url?: string;
    contactInfo?: string;
    stages?: Stage[];
    saleSchedules?: SaleSchedule[];
  };
}) {
  const formatDate = (date: Date) => {
    return format(date, 'yyyy/MM/dd', { locale: ja });
  };

  const formatTime = (date: Date) => {
    return format(date, 'HH:mm', { locale: ja });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] lg:w-[900px] max-w-none sm:max-w-none max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>イベントの公開確認</DialogTitle>
          <DialogDescription asChild>
            <div>
              <p className="mb-4">
                公開するイベントページの情報に誤りがないか確認してください
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* イベント情報 */}
            <section>
              <h3 className="text-sm font-semibold mb-3 pb-2 border-b">
                イベント情報
              </h3>
              <div className="rounded-lg border bg-muted/50 p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">タイトル</p>
                  <p className="text-sm font-medium text-foreground">
                    {event.name}
                  </p>
                </div>
                {event.description && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">詳細</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {event.description}
                    </p>
                  </div>
                )}
                {event.url && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">URL</p>
                    <p className="text-sm text-foreground break-all">
                      {event.url}
                    </p>
                  </div>
                )}
                {event.contactInfo && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">連絡先</p>
                    <p className="text-sm text-foreground">
                      {event.contactInfo}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* 公演情報 */}
            {event.stages && event.stages.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold mb-3 pb-2 border-b">
                  公演情報
                </h3>
                <div className="space-y-3">
                  {event.stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="rounded-lg border bg-muted/50 p-4"
                    >
                      <h4 className="text-sm font-medium mb-2">
                        {index + 1}日目
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="text-muted-foreground">日程</span>
                          <span className="text-foreground">
                            {formatDate(stage.date)}
                          </span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="text-muted-foreground">日時</span>
                          <span className="text-foreground">
                            {formatDate(stage.date)} 開場{' '}
                            {formatTime(stage.startTime)} 終演{' '}
                            {formatTime(stage.endTime)}
                          </span>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="text-muted-foreground">会場名</span>
                          <span className="text-foreground">
                            {stage.venueName}
                          </span>
                        </div>
                        {stage.artists && stage.artists.length > 0 && (
                          <div className="grid grid-cols-[80px_1fr] gap-2">
                            <span className="text-muted-foreground">
                              出演者
                            </span>
                            <span className="text-foreground">
                              {stage.artists.join(' / ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* チケット販売情報 */}
            {event.saleSchedules && event.saleSchedules.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold mb-3 pb-2 border-b">
                  チケット販売情報
                </h3>
                <SaleSchedules
                  saleSchedules={event.saleSchedules}
                  readOnly={true}
                />
              </section>
            )}

            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
              <p className="text-sm text-foreground font-medium">
                公開後、ユーザーがこのイベントを閲覧・購入できるようになります。
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={onConfirm}>公開する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
