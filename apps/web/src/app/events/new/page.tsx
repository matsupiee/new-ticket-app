'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation } from 'urql';
import { Plus, Trash2, X } from 'lucide-react';
import { graphql } from '../../../libs/graphql/tada';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import Link from 'next/link';

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

type StageFormData = {
  name: string;
  venueName: string;
  doorsOpenAt: string;
  startAt: string;
  artists: string[];
};

type EventFormData = {
  name: string;
  description: string;
  mainImage: File | null;
  additionalImages: File[];
  inquiryName: string;
  inquiryAddress: string;
  stages: StageFormData[];
};

export default function NewEventPage() {
  const router = useRouter();
  const [createResult, createEvent] = useMutation(EventCreateMutation);

  const form = useForm<EventFormData>({
    defaultValues: {
      name: '',
      description: '',
      mainImage: null,
      additionalImages: [],
      inquiryName: '',
      inquiryAddress: '',
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
    try {
      // 1ステージしかない場合で公演名が空欄だったら、イベント名をそのままコピー
      if (data.stages.length === 1 && !data.stages[0].name) {
        data.stages[0].name = data.name;
      }

      // ステージの開始時刻と終了時刻から、イベント全体の開始時刻と終了時刻を計算
      const stageStartTimes = data.stages.map((stage) => new Date(stage.startAt));
      const stageEndTimes = data.stages
        .map((stage) => (stage.endAt ? new Date(stage.endAt) : null))
        .filter((date): date is Date => date !== null);

      const eventStartAt = new Date(Math.min(...stageStartTimes.map((d) => d.getTime())));
      const eventEndAt = stageEndTimes.length > 0
        ? new Date(Math.max(...stageEndTimes.map((d) => d.getTime())))
        : new Date(Math.max(...stageStartTimes.map((d) => d.getTime())));

      // TODO: 画像のアップロード処理（現在はスキップ）
      // 画像は別途アップロードAPIで処理する想定

      // GraphQLミューテーションを実行
      const result = await createEvent({
        input: {
          name: data.name,
          description: data.description,
          thumbnailUrls: [], // TODO: 画像アップロード後にURLを設定
          lineThumbnailUrl: null,
          startAt: eventStartAt.toISOString(),
          endAt: eventEndAt.toISOString(),
          eventOrganizerId: 'temp-organizer-id', // TODO: 認証実装後に実際のIDを取得
          inquiryName: data.inquiryName,
          inquiryAddress: data.inquiryAddress,
          stages: data.stages.map((stage) => ({
            name: stage.name,
            venueName: stage.venueName,
            doorsOpenAt: stage.doorsOpenAt ? new Date(stage.doorsOpenAt).toISOString() : null,
            startAt: new Date(stage.startAt).toISOString(),
            endAt: stage.endAt ? new Date(stage.endAt).toISOString() : null,
            artistNames: stage.artists.filter((name) => name.trim() !== ''),
          })),
        },
      });

      if (result.error) {
        console.error('Error creating event:', result.error);
        alert(`エラーが発生しました: ${result.error.message}`);
        return;
      }

      // 成功したらイベント一覧ページにリダイレクト
      router.push('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert(`エラーが発生しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="mainImage"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>メイン画像</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          accept="image/*"
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
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>追加画像</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          accept="image/*"
                          multiple
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
                name="inquiryName"
                rules={{ required: '問い合わせ先名は必須です' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>問い合わせ先名</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="例: イベント事務局" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inquiryAddress"
                rules={{ required: '問い合わせ先住所は必須です' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>問い合わせ先住所</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="例: inquiry@example.com" />
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

function StageForm({
  index,
  form,
  onRemove,
  isFirst,
  eventName,
}: {
  index: number;
  form: ReturnType<typeof useForm<EventFormData>>;
  onRemove: () => void;
  isFirst: boolean;
  eventName: string;
}) {
  const artists = form.watch(`stages.${index}.artists`) || [''];

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">
          ステージ {index + 1}
        </h3>
        {!isFirst && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`stages.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                公演名
                {isFirst && (
                  <span className="text-xs text-gray-500 ml-2">
                    (空欄の場合はイベント名を使用)
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={
                    isFirst && !field.value && eventName
                      ? eventName
                      : '例: 第1部'
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`stages.${index}.venueName`}
          rules={{ required: '会場名は必須です' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>会場名</FormLabel>
              <FormControl>
                <Input {...field} placeholder="例: 東京ドーム" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`stages.${index}.doorsOpenAt`}
          rules={{
            required: '開場時刻は必須です',
            validate: (value) => {
              if (!value) return true;
              const doorsOpen = new Date(value);
              const now = new Date();
              if (doorsOpen <= now) {
                return '開場時刻は現在時刻より後である必要があります';
              }
              return true;
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>開場時刻</FormLabel>
              <FormControl>
                <Input {...field} type="datetime-local" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`stages.${index}.startAt`}
          rules={{
            required: '開演時刻は必須です',
            validate: (value) => {
              if (!value) return true;
              const startAt = new Date(value);
              const doorsOpenAt = form.getValues(`stages.${index}.doorsOpenAt`);
              if (doorsOpenAt) {
                const doorsOpen = new Date(doorsOpenAt);
                if (startAt <= doorsOpen) {
                  return '開演時刻は開場時刻より後である必要があります';
                }
              }
              return true;
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>開演時刻</FormLabel>
              <FormControl>
                <Input {...field} type="datetime-local" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>出演アーティスト</Label>
        {artists.map((_, artistIndex) => (
          <div key={artistIndex} className="flex gap-2">
            <FormField
              control={form.control}
              name={`stages.${index}.artists.${artistIndex}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} placeholder="アーティスト名" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {artists.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const currentArtists = form.getValues(
                    `stages.${index}.artists`,
                  );
                  form.setValue(
                    `stages.${index}.artists`,
                    currentArtists.filter((_, i) => i !== artistIndex),
                  );
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const currentArtists = form.getValues(`stages.${index}.artists`);
            form.setValue(`stages.${index}.artists`, [
              ...currentArtists,
              '',
            ]);
          }}
        >
          <Plus className="size-4 mr-2" />
          アーティストを追加
        </Button>
      </div>
    </div>
  );
}
