'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { useMutation } from 'urql';
import { graphql } from 'gql.tada';

const ArtistCreateMutation = graphql(`
  mutation ArtistCreate($input: ArtistCreateInput!) {
    artistCreate(input: $input) {
      artist {
        id
        name
      }
    }
  }
`);

export type ArtistFormData = {
  id: string;
  name: string;
};

export type StageFormData = {
  name: string;
  venueName: string;
  doorsOpenAt: string;
  startAt: string;
  artists: ArtistFormData[];
};

export type EventFormData = {
  name: string;
  description: string;
  mainImage: File | null;
  additionalImages: File[];
  inquiry: string;
  stages: StageFormData[];
};

export function StageForm({
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
  const artists = form.watch(`stages.${index}.artists`) || [];
  const [newArtistName, setNewArtistName] = useState('');

  const [{ fetching: isCreatingArtist }, createArtist] =
    useMutation(ArtistCreateMutation);

  const handleAddArtist = async () => {
    if (!newArtistName.trim()) return;

    const { error, data } = await createArtist({
      input: { name: newArtistName.trim() },
    });
    if (error || !data) {
      alert('アーティストの作成に失敗しました');
      return;
    }

    const artist = data.artistCreate.artist;
    const currentArtists = form.getValues(`stages.${index}.artists`);
    form.setValue(`stages.${index}.artists`, [...currentArtists, artist]);
    setNewArtistName('');
  };

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">ステージ {index + 1}</h3>
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
              <FormLabel>公演名</FormLabel>
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
              <div className="min-h-10">
                <FormMessage />
              </div>
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
              <div className="min-h-10">
                <FormMessage />
              </div>
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
              <div className="min-h-10">
                <FormMessage />
              </div>
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
              <div className="min-h-10">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label>出演アーティスト</Label>
        {artists.map((artist, artistIndex) => (
          <div key={artist.id || artistIndex} className="flex gap-2">
            <FormField
              control={form.control}
              name={`stages.${index}.artists.${artistIndex}.name`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="アーティスト名"
                      readOnly
                      className="bg-gray-100"
                    />
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
        <div className="flex gap-2">
          <Input
            value={newArtistName}
            onChange={(e) => setNewArtistName(e.target.value)}
            placeholder="アーティスト名を入力"
            onKeyDown={async (e) => {
              if (e.key === 'Enter' && newArtistName.trim()) {
                e.preventDefault();
                await handleAddArtist();
              }
            }}
            disabled={isCreatingArtist}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddArtist}
            disabled={!newArtistName.trim() || isCreatingArtist}
          >
            <Plus className="size-4 mr-2" />
            {isCreatingArtist ? '追加中...' : 'アーティストを追加'}
          </Button>
        </div>
      </div>
    </div>
  );
}
