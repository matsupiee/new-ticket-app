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

const SaleScheduleCreateMutation = graphql(`
  mutation SaleScheduleCreate($input: SaleScheduleCreateInput!) {
    saleScheduleCreate(input: $input) {
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

export function CreateSaleScheduleDialog({
  open,
  onOpenChange,
  eventId,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  onSuccess?: () => void;
}) {
  const [saleScheduleCreateResult, createSaleSchedule] = useMutation(
    SaleScheduleCreateMutation,
  );

  const form = useForm<SaleScheduleFormData>({
    defaultValues: {
      name: '',
      description: '',
      saleType: 'FIRST_COME',
      publishAt: '',
      saleStartAt: '',
      saleEndAt: '',
      lotteryMode: null,
      lotteryStartAt: null,
      lotteryResultAnnounceAt: null,
      isSmsAuthRequired: false,
    },
  });

  const saleType = form.watch('saleType');

  const onSubmit = async (data: SaleScheduleFormData) => {
    const result = await createSaleSchedule({
      input: {
        eventId,
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
      console.error('Error creating sale schedule:', result.error);
      alert(`エラーが発生しました: ${result.error.message}`);
      return;
    }

    form.reset();
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>販売スケジュールを新規作成</DialogTitle>
        </DialogHeader>

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
                    <Input {...field} placeholder="例: 先行抽選" />
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
                    <Input {...field} type="datetime-local" />
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
                    <Input {...field} type="datetime-local" />
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
                    <Input {...field} type="datetime-local" />
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
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
              >
                キャンセル
              </Button>
              <Button
                type="submit"
                disabled={saleScheduleCreateResult.fetching}
              >
                {saleScheduleCreateResult.fetching ? '作成中...' : '作成'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
