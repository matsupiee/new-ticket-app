'use client';

import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, MapPin, Mic } from 'lucide-react';

type Stage = {
  id: string;
  name: string | null;
  doorsOpenAt: string;
  startAt: string;
  venue: {
    id: string;
    name: string;
  } | null;
  stageArtists: Array<{
    artist: {
      id: string;
      name: string;
    };
  }> | null;
};

type StagesProps = {
  stages: Stage[];
};

export function Stages({ stages }: StagesProps) {
  if (!stages || stages.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">公演情報がありません</p>
    );
  }

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const stageDate = new Date(stage.startAt);
        const doorsOpenDate = new Date(stage.doorsOpenAt);
        const dayLabel = index + 1 + '日目';

        return (
          <div
            key={stage.id}
            className="border rounded-lg p-4 bg-gray-50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{dayLabel}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Calendar className="size-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">
                    {format(stageDate, 'yyyy/MM/dd (E)', {
                      locale: ja,
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    開場時刻 {format(doorsOpenDate, 'HH:mm')} / 開演時刻{' '}
                    {format(stageDate, 'HH:mm')}
                  </p>
                </div>
              </div>

              {stage.venue && (
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 text-gray-500 mt-0.5" />
                  <p className="text-sm text-gray-900">{stage.venue.name}</p>
                </div>
              )}
            </div>

            {stage.stageArtists && stage.stageArtists.length > 0 && (
              <div className="flex items-start gap-2">
                <Mic className="size-4 text-gray-500 mt-0.5" />
                <div className="flex flex-wrap gap-2">
                  {stage.stageArtists.map((stageArtist, i, array) => (
                    <span
                      key={stageArtist.artist.id}
                      className="text-sm text-gray-900"
                    >
                      {stageArtist.artist.name} {i < array.length - 1 && '/'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
