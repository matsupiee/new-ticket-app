'use client';

import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import { graphql } from '../../../../../libs/graphql/tada';
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

const TicketTypeCreateMutation = graphql(`
  mutation TicketTypeCreate($input: TicketTypeCreateInput!) {
    ticketTypeCreate(input: $input) {
      ticketType {
        id
        name
        description
        seatType
        basePrice
        capacity
        maxNumPerApply
        isOnceApplyOnly
        isOnlyQrCodeEntry
      }
    }
  }
`);

type TicketTypeFormData = {
  name: string;
  description: string;
  seatType: 'RESERVED' | 'ENTRY_NUMBER' | 'FREE';
  basePrice: string;
  capacity: string;
  maxNumPerApply: string;
  isOnceApplyOnly: boolean;
  isOnlyQrCodeEntry: boolean;
};

export function CreateTicketTypeDialog({
  open,
  onOpenChange,
  saleScheduleId,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saleScheduleId: string;
  onSuccess?: () => void;
}) {
  const [ticketTypeCreateResult, createTicketType] = useMutation(
    TicketTypeCreateMutation,
  );

  const form = useForm<TicketTypeFormData>({
    defaultValues: {
      name: '',
      description: '',
      seatType: 'FREE',
      basePrice: '',
      capacity: '',
      maxNumPerApply: '1',
      isOnceApplyOnly: false,
      isOnlyQrCodeEntry: false,
    },
  });

  const onSubmit = async (data: TicketTypeFormData) => {
    const result = await createTicketType({
      input: {
        saleScheduleId,
        name: data.name,
        description: data.description,
        seatType: data.seatType,
        basePrice: Number(data.basePrice),
        capacity: Number(data.capacity),
        maxNumPerApply: Number(data.maxNumPerApply),
        isOnceApplyOnly: data.isOnceApplyOnly,
        isOnlyQrCodeEntry: data.isOnlyQrCodeEntry,
      },
    });

    if (result.error) {
      console.error('Error creating ticket type:', result.error);
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
          <DialogTitle>券種を追加</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: '券名は必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>券名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="例: S席、A席、立見" />
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
                      rows={3}
                      placeholder="チケットタイプの説明を入力してください"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="seatType"
              rules={{
                required: '座席タイプは必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>座席タイプ</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="座席タイプを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RESERVED">座席指定</SelectItem>
                      <SelectItem value="ENTRY_NUMBER">整理番号</SelectItem>
                      <SelectItem value="FREE">自由</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="basePrice"
              rules={{
                required: '価格は必須です',
                validate: (v) =>
                  v !== '' && Number(v) >= 0
                    ? true
                    : '価格は0以上である必要があります',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>価格（円）</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      placeholder="例: 10000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacity"
              rules={{
                required: '枠数は必須です',
                validate: (v) =>
                  v !== '' && Number(v) >= 1
                    ? true
                    : '枠数は1以上である必要があります',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>枠数</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      placeholder="例: 100"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxNumPerApply"
              rules={{
                required: '1申込あたりの最大枚数は必須です',
                validate: (v) =>
                  v !== '' && Number(v) >= 1
                    ? true
                    : '1申込あたりの最大枚数は1以上である必要があります',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1申込あたりの最大枚数</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      placeholder="例: 4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isOnceApplyOnly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      一度のみ申込可能
                    </FormLabel>
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

            <FormField
              control={form.control}
              name="isOnlyQrCodeEntry"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      QRコードのみで入場
                    </FormLabel>
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
              <Button type="submit" disabled={ticketTypeCreateResult.fetching}>
                {ticketTypeCreateResult.fetching ? '作成中...' : '作成'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
