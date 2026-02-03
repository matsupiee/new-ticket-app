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

const EventUpdateMutation = graphql(`
  mutation EventUpdate($input: EventUpdateInput!) {
    eventUpdate(input: $input) {
      event {
        id
        name
        description
        thumbnailUrls
        inquiry
      }
    }
  }
`);

type EventFormData = {
  name: string;
  description: string;
  inquiry: string;
};

export function EditEventDialog({
  open,
  onOpenChange,
  event,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: {
    id: string;
    name: string;
    description: string;
    inquiry: string;
  };
  onSuccess?: () => void;
}) {
  const [eventUpdateResult, updateEvent] = useMutation(EventUpdateMutation);

  const form = useForm<EventFormData>({
    defaultValues: {
      name: event.name,
      description: event.description,
      inquiry: event.inquiry,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    const eventResult = await updateEvent({
      input: {
        id: event.id,
        name: data.name,
        description: data.description,
        inquiry: data.inquiry,
      },
    });

    if (eventResult.error) {
      console.error('Error updating event:', eventResult.error);
      alert(`エラーが発生しました: ${eventResult.error.message}`);
      return;
    }

    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>イベント情報を編集</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: 'イベント名は必須です',
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>イベント名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="例: サマーコンサート2024" />
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
                  <FormLabel>イベント詳細</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      placeholder="イベントの詳細を入力してください（Markdown記法対応）"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inquiry"
              rules={{ required: '問い合わせ先名は必須です' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>問い合わせ先名</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="例: 03-1234-5678" />
                  </FormControl>
                  <FormMessage />
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
              <Button type="submit" disabled={eventUpdateResult.fetching}>
                {eventUpdateResult.fetching ? '更新中...' : '更新'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
