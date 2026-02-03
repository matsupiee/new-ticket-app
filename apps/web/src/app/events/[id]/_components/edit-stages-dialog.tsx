'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation } from 'urql';
import { Plus } from 'lucide-react';
import { graphql } from '../../../../libs/graphql/tada';
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
} from '../../../events/new/_components/stage-form';
import type { EventFormData } from '../../../events/new/_components/stage-form';

const StagesUpdateMutation = graphql(`
  mutation StagesUpdate($input: StagesUpdateInput!) {
    stagesUpdate(input: $input) {
      event {
        id
        stages {
          id
          name
          doorsOpenAt
          startAt
          venue {
            id
            name
          }
          stageArtists {
            artist {
              id
              name
            }
          }
        }
      }
    }
  }
`);

type StagesFormData = {
  stages: StageFormData[];
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

  const defaultStages: StageFormData[] =
    event.stages && event.stages.length > 0
      ? event.stages.map((stage) => ({
          name: stage.name || '',
          venueName: stage.venue?.name || '',
          doorsOpenAt: new Date(stage.doorsOpenAt).toISOString().slice(0, 16),
          startAt: new Date(stage.startAt).toISOString().slice(0, 16),
          artists:
            stage.stageArtists && stage.stageArtists.length > 0
              ? stage.stageArtists.map((sa) => sa.artist.name)
              : [''],
        }))
      : [
          {
            name: '',
            venueName: '',
            doorsOpenAt: '',
            startAt: '',
            artists: [''],
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

    // ステージ情報を更新
    const stagesResult = await updateStages({
      input: {
        eventId: event.id,
        stages: data.stages.map((stage) => ({
          name: stage.name,
          venueName: stage.venueName,
          doorsOpenAt: new Date(stage.doorsOpenAt).toISOString(),
          startAt: new Date(stage.startAt).toISOString(),
          artistNames: stage.artists.filter((name) => name.trim() !== ''),
        })),
      },
    });

    if (stagesResult.error) {
      console.error('Error updating stages:', stagesResult.error);
      alert(`エラーが発生しました: ${stagesResult.error.message}`);
      return;
    }

    onSuccess?.();
    onOpenChange(false);
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
                    artists: [''],
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
              <Button type="submit" disabled={stagesUpdateResult.fetching}>
                {stagesUpdateResult.fetching ? '更新中...' : '更新'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
