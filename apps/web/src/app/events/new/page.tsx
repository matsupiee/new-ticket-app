'use client';

import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation } from 'urql';
import { Plus, X } from 'lucide-react';
import { graphql } from '../../../libs/graphql/tada';
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
import Link from 'next/link';
import { StageForm, type EventFormData } from './_components/stage-form';

const EventCreateMutation = graphql(`
  mutation EventCreate($input: EventCreateInput!) {
    eventCreate(input: $input) {
      event {
        id
        name
      }
    }
  }
`);

export default function NewEventPage() {
  const router = useRouter();
  const [createResult, createEvent] = useMutation(EventCreateMutation);

  const form = useForm<EventFormData>({
    defaultValues: {
      name: '',
      description: '',
      mainImage: null,
      additionalImages: [],
      inquiry: '',
      stages: [
        {
          name: '',
          venueName: '',
          doorsOpenAt: '',
          startAt: '',
          artists: [''],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'stages',
  });

  const onSubmit = async (data: EventFormData) => {
    // 1ステージしかない場合で公演名が空欄だったら、イベント名をそのままコピー
    if (data.stages.length === 1 && !data.stages.at(0)?.name) {
      data.stages.at(0)!.name = data.name;
    }

    // TODO: 画像のアップロード処理（現在はスキップ）
    // 画像は別途アップロードAPIで処理する想定

    // GraphQLミューテーションを実行
    const variables = {
      input: {
        name: data.name,
        description: data.description,
        thumbnailUrls: [], // TODO: 画像アップロード後にURLを設定
        lineThumbnailUrl: null,
        eventOrganizerId: 'organizer1',
        inquiry: data.inquiry,
        stages: data.stages.map((stage) => ({
          name: stage.name,
          venueName: stage.venueName,
          doorsOpenAt: new Date(stage.doorsOpenAt).toISOString(),
          startAt: new Date(stage.startAt).toISOString(),
          artistNames: stage.artists.filter((name) => name.trim() !== ''),
        })),
      },
    };
    const result = await createEvent(variables);

    if (result.error) {
      console.error('Error creating event:', result.error);
      alert(`エラーが発生しました: ${result.error.message}`);
      return;
    }

    // 成功したらイベント一覧ページにリダイレクト
    router.push('/events');
  };

  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">イベント作成</h1>
          <Button variant="ghost" asChild>
            <Link href="/events">
              <X className="size-4" />
              キャンセル
            </Link>
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* イベント基本情報 */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                イベント基本情報
              </h2>

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
                      <Input
                        {...field}
                        placeholder="例: サマーコンサート2024"
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="mainImage"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                      <FormLabel>メイン画像</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalImages"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                      <FormLabel>追加画像</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            onChange(files);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 問い合わせ先情報 */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">
                問い合わせ先情報
              </h2>

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
            </div>

            {/* ステージ情報 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  ステージ情報
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      name: '',
                      venueName: '',
                      doorsOpenAt: '',
                      startAt: '',
                      artists: [''],
                    })
                  }
                >
                  <Plus className="size-4 mr-2" />
                  ステージを追加
                </Button>
              </div>

              {fields.map((field, index) => (
                <StageForm
                  key={field.id}
                  index={index}
                  form={form}
                  onRemove={() => remove(index)}
                  isFirst={index === 0}
                  eventName={form.watch('name')}
                />
              ))}
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button type="button" variant="outline" asChild>
                <Link href="/events">キャンセル</Link>
              </Button>
              <Button type="submit" disabled={createResult.fetching}>
                {createResult.fetching ? '作成中...' : '作成'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
