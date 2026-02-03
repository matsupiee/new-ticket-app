'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import { graphql } from '../../../../libs/graphql/tada';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const SaleScheduleUpdateMutation = graphql(`
  mutation SaleScheduleUpdate($input: SaleScheduleUpdateInput!) {
    saleScheduleUpdate(input: $input) {
      saleSchedule {
        id
        name
        description
        saleType
        publishAt
        saleStartAt
        saleEndAt
        lotteryMode
        lotteryStartAt
        lotteryResultAnnounceAt
        isSmsAuthRequired
        publishStatus
      }
    }
  }
`);

type SaleScheduleFormData = {
  name: string;
  description: string;
  saleType: 'FIRST_COME' | 'LOTTERY';
  publishAt: string;
  saleStartAt: string;
  saleEndAt: string;
  lotteryMode?: 'MANUAL' | 'AUTO' | null;
  lotteryStartAt?: string | null;
  lotteryResultAnnounceAt?: string | null;
  isSmsAuthRequired: boolean;
};

export function EditSaleScheduleDialog({
  open,
  onOpenChange,
  saleSchedule,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saleSchedule: {
    id: string;
    name: string;
    description: string;
    saleType: 'FIRST_COME' | 'LOTTERY';
    publishAt: string;
    saleStartAt: string;
    saleEndAt: string;
    lotteryMode?: 'MANUAL' | 'AUTO' | null;
    lotteryStartAt?: string | null;
    lotteryResultAnnounceAt?: string | null;
    isSmsAuthRequired: boolean;
    publishStatus: 'PUBLISHED' | 'UNPUBLISHED';
  };
  onSuccess?: () => void;
}) {
  const [saleScheduleUpdateResult, updateSaleSchedule] = useMutation(
    SaleScheduleUpdateMutation,
  );

  const form = useForm<SaleScheduleFormData>({
    defaultValues: {
      name: saleSchedule.name,
      description: saleSchedule.description,
      saleType: saleSchedule.saleType,
      publishAt: new Date(saleSchedule.publishAt).toISOString().slice(0, 16),
      saleStartAt: new Date(saleSchedule.saleStartAt)
        .toISOString()
        .slice(0, 16),
      saleEndAt: new Date(saleSchedule.saleEndAt).toISOString().slice(0, 16),
      lotteryMode: saleSchedule.lotteryMode || null,
      lotteryStartAt: saleSchedule.lotteryStartAt
        ? new Date(saleSchedule.lotteryStartAt).toISOString().slice(0, 16)
        : null,
      lotteryResultAnnounceAt: saleSchedule.lotteryResultAnnounceAt
        ? new Date(saleSchedule.lotteryResultAnnounceAt)
            .toISOString()
            .slice(0, 16)
        : null,
      isSmsAuthRequired: saleSchedule.isSmsAuthRequired,
    },
  });

  const saleType = form.watch('saleType');

  const onSubmit = async (data: SaleScheduleFormData) => {
    const result = await updateSaleSchedule({
      input: {
        id: saleSchedule.id,
        name: data.name,
        description: data.description,
        saleType: data.saleType,
        publishAt: new Date(data.publishAt).toISOString(),
        saleStartAt: new Date(data.saleStartAt).toISOString(),
        saleEndAt: new Date(data.saleEndAt).toISOString(),
        lotteryMode: data.saleType === 'LOTTERY' ? data.lotteryMode : undefined,
        lotteryStartAt:
          data.saleType === 'LOTTERY' && data.lotteryStartAt
            ? new Date(data.lotteryStartAt).toISOString()
            : undefined,
        lotteryResultAnnounceAt:
          data.saleType === 'LOTTERY' && data.lotteryResultAnnounceAt
            ? new Date(data.lotteryResultAnnounceAt).toISOString()
            : undefined,
        isSmsAuthRequired: data.isSmsAuthRequired,
      },
    });

    if (result.error) {
      console.error('Error updating sale schedule:', result.error);
      alert(`エラーが発生しました: ${result.error.message}`);
      return;
    }

    onSuccess?.();
    onOpenChange(false);
  };

  const isPublished = saleSchedule.publishStatus === 'PUBLISHED';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>販売スケジュールを編集</DialogTitle>
        </DialogHeader>

        {isPublished && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              このスケジュールは公開中のため編集できません。
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: 'スケジュール名は必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>スケジュール名</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="例: 先行抽選"
                      disabled={isPublished}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明文</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="説明文を入力してください"
                      disabled={isPublished}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saleType"
              rules={{
                required: '販売方式は必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>販売方式</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPublished}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="販売方式を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FIRST_COME">先着</SelectItem>
                      <SelectItem value="LOTTERY">抽選</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publishAt"
              rules={{
                required: '公開日時は必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>公開日時</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      disabled={isPublished}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saleStartAt"
              rules={{
                required: '販売開始日時は必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>販売開始日時</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      disabled={isPublished}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saleEndAt"
              rules={{
                required: '販売終了日時は必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>販売終了日時</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      disabled={isPublished}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {saleType === 'LOTTERY' && (
              <>
                <FormField
                  control={form.control}
                  name="lotteryMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>抽選方式</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || undefined}
                        disabled={isPublished}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="抽選方式を選択" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MANUAL">手動</SelectItem>
                          <SelectItem value="AUTO">自動</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lotteryStartAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>抽選開始日時</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          type="datetime-local"
                          disabled={isPublished}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lotteryResultAnnounceAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>抽選結果発表日時</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ''}
                          type="datetime-local"
                          disabled={isPublished}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="isSmsAuthRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">SMS認証必須</FormLabel>
                  </div>
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={isPublished}
                      className="h-4 w-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={saleScheduleUpdateResult.fetching || isPublished}
              >
                {saleScheduleUpdateResult.fetching ? '更新中...' : '更新'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
