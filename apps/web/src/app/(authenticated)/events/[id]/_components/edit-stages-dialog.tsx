'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation } from 'urql';
import { Plus } from 'lucide-react';
import { graphql } from '../../../../../libs/graphql/tada';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Form } from '@/shared/components/ui/form';
import {
  StageForm,
  type StageFormData,
} from '../../new/_components/stage-form';
import type { EventFormData } from '../../new/_components/stage-form';

const StagesUpdateMutation = graphql(`
  mutation StagesUpdate($input: StagesUpdateInput!) {
    stagesUpdate(input: $input) {
      stages {
        id
      }
    }
  }
`);

const VenueCreateMutation = graphql(`
  mutation VenueCreate($input: VenueCreateInput!) {
    venueCreate(input: $input) {
      venue {
        id
        name
      }
    }
  }
`);

type StagesFormData = {
  stages: (StageFormData & { id?: string })[];
  eventName: string;
};

export function EditStagesDialog({
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
    stages?: Array<{
      id: string;
      name: string;
      doorsOpenAt: string;
      startAt: string;
      venue?: { id: string; name: string } | null;
      stageArtists?: Array<{ artist: { id: string; name: string } }> | null;
    }>;
  };
  onSuccess?: () => void;
}) {
  const [stagesUpdateResult, updateStages] = useMutation(StagesUpdateMutation);
  const [venueCreateResult, createVenue] = useMutation(VenueCreateMutation);

  const defaultStages: (StageFormData & { id?: string })[] =
    event.stages && event.stages.length > 0
      ? event.stages.map((stage) => ({
          id: stage.id,
          name: stage.name || '',
          venueName: stage.venue?.name || '',
          doorsOpenAt: new Date(stage.doorsOpenAt).toISOString().slice(0, 16),
          startAt: new Date(stage.startAt).toISOString().slice(0, 16),
          artists:
            stage.stageArtists && stage.stageArtists.length > 0
              ? stage.stageArtists.map((sa) => ({
                  id: sa.artist.id,
                  name: sa.artist.name,
                }))
              : [],
        }))
      : [
          {
            name: '',
            venueName: '',
            doorsOpenAt: '',
            startAt: '',
            artists: [],
          },
        ];

  const form = useForm<StagesFormData>({
    defaultValues: {
      eventName: event.name,
      stages: defaultStages,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'stages',
  });

  const onSubmit = async (data: StagesFormData) => {
    // 1ステージしかない場合で公演名が空欄だったら、イベント名をそのままコピー
    if (data.stages.length === 1 && !data.stages.at(0)?.name) {
      data.stages.at(0)!.name = data.eventName;
    }

    try {
      // 各ステージの会場とアーティストのIDを取得または作成
      const stagesWithIds = await Promise.all(
        data.stages.map(async (stage) => {
          // 会場IDを取得または作成
          let venueId: string | undefined = undefined;
          if (stage.venueName && stage.venueName.trim() !== '') {
            // 既存の会場を検索（ここでは簡易的にcreateを使用）
            // 実際の実装では、findFirst的なクエリが必要な場合があります
            const venueResult = await createVenue({
              input: { name: stage.venueName.trim() },
            });
            if (venueResult.error) {
              throw new Error(
                `会場の作成に失敗しました: ${venueResult.error.message}`,
              );
            }
            venueId = venueResult.data?.venueCreate.venue.id;
          }

          // アーティストIDを取得（既にフォームに保存されている）
          const artistIds = stage.artists.map((artist) => artist.id);

          return {
            id: stage.id || '', // 既存のステージのID、新規の場合は空文字（バックエンドで処理）
            name: stage.name,
            venueId,
            doorsOpenAt: new Date(stage.doorsOpenAt).toISOString(),
            startAt: new Date(stage.startAt).toISOString(),
            artistIds: artistIds.filter((id): id is string => id !== undefined),
          };
        }),
      );

      // ステージ情報を更新
      const stagesResult = await updateStages({
        input: {
          eventId: event.id,
          stages: stagesWithIds,
        },
      });

      if (stagesResult.error) {
        console.error('Error updating stages:', stagesResult.error);
        alert(`エラーが発生しました: ${stagesResult.error.message}`);
        return;
      }

      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error('Error in onSubmit:', error);
      alert(
        `エラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`,
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>公演情報を編集</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">公演情報</h3>

              {fields.map((field, index) => (
                <StageForm
                  key={field.id}
                  index={index}
                  form={
                    form as unknown as ReturnType<typeof useForm<EventFormData>>
                  }
                  onRemove={() => remove(index)}
                  isFirst={index === 0}
                  eventName={form.watch('eventName')}
                />
              ))}
            </div>

            <div className="flex justify-center">
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
                    artists: [],
                  })
                }
              >
                <Plus className="size-4 mr-2" />
                ステージを追加
              </Button>
            </div>

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
                disabled={
                  stagesUpdateResult.fetching || venueCreateResult.fetching
                }
              >
                {stagesUpdateResult.fetching || venueCreateResult.fetching
                  ? '更新中...'
                  : '更新'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
