'use client';

import { useQuery } from 'urql';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Mic, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { graphql } from '../../../libs/graphql/tada';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Badge } from '@/shared/components/ui/badge';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared/components/ui/tabs';

const EventDetailQuery = graphql(`
  query EventDetail($id: ID!) {
    event(id: $id) {
      id
      name
      thumbnailUrls
      stages {
        id
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
      saleSchedules {
        id
        name
        saleStartAt
        saleEndAt
        lotteryStartAt
        lotteryResultAnnounceAt
        publishStatus
        ticketTypes {
          id
          name
          basePrice
          capacity
          maxNumPerApply
        }
      }
    }
  }
`);

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;

  const [{ data, fetching, error }] = useQuery({
    query: EventDetailQuery,
    variables: { id: eventId },
  });

  if (fetching) {
    return (
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-96 w-full mb-6" />
        </div>
      </div>
    );
  }

  if (error || !data?.event) {
    return (
      <div className="flex-1 p-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-red-600">
            エラーが発生しました: {error?.message || 'イベントが見つかりません'}
          </p>
        </div>
      </div>
    );
  }

  const event = data.event;
  const mainImage = event.thumbnailUrls?.[0];
  const eventUrl = `https://dev.t-dv.com/${event.id}`;
  const previewUrl = `https://td-lf-dev.web.app/event/${event.id}?pvtoken=preview`;

  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-6xl">
        {/* ヘッダー */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
            <p className="text-sm text-gray-500 mt-1">ID: {event.id}</p>
          </div>
        </div>

        {/* タブ */}
        <Tabs defaultValue="event" className="space-y-6">
          <TabsList variant="line">
            <TabsTrigger value="event">イベント情報</TabsTrigger>
            <TabsTrigger value="tickets">チケット情報</TabsTrigger>
            <TabsTrigger value="sales">売上</TabsTrigger>
            <TabsTrigger value="applicants">申込者</TabsTrigger>
            <TabsTrigger value="favorites">お目当て</TabsTrigger>
            <TabsTrigger value="mail">メール</TabsTrigger>
          </TabsList>

          {/* イベント情報タブ */}
          <TabsContent value="event" className="space-y-6">
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  イベント情報
                </h2>
                <Button variant="outline" size="sm">
                  <Pencil className="size-4 mr-2" />
                  編集する
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* 画像 */}
                <div>
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={event.name}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* URL情報 */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      URL
                    </label>
                    <code className="text-sm bg-gray-50 px-2 py-1 rounded block">
                      {eventUrl}
                    </code>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      プレビュー
                    </label>
                    <code className="text-sm bg-gray-50 px-2 py-1 rounded block">
                      {previewUrl}
                    </code>
                  </div>
                </div>
              </div>

              {/* 公演リスト */}
              <div className="mt-6 space-y-4">
                {event.stages?.map((stage, index) => {
                  const stageDate = new Date(stage.startAt);
                  const doorsOpenDate = new Date(stage.doorsOpenAt);
                  const dayLabel = index + 1 + '日目';

                  return (
                    <div
                      key={stage.id}
                      className="border rounded-lg p-4 bg-gray-50 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {dayLabel}
                        </h3>
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
                              開場時刻 {format(doorsOpenDate, 'HH:mm')} /
                              開演時刻 {format(stageDate, 'HH:mm')}
                            </p>
                          </div>
                        </div>

                        {stage.venue && (
                          <div className="flex items-start gap-2">
                            <MapPin className="size-4 text-gray-500 mt-0.5" />
                            <p className="text-sm text-gray-900">
                              {stage.venue.name}
                            </p>
                          </div>
                        )}
                      </div>

                      {stage.stageArtists && stage.stageArtists.length > 0 && (
                        <div className="flex items-start gap-2">
                          <Mic className="size-4 text-gray-500 mt-0.5" />
                          <div className="flex flex-wrap gap-2">
                            {stage.stageArtists.map((stageArtist) => (
                              <span
                                key={stageArtist.artist.id}
                                className="text-sm text-gray-900"
                              >
                                {stageArtist.artist.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* チケット情報タブ */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="border rounded-lg p-6 bg-white">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                チケット情報
              </h2>

              {!event.saleSchedules || event.saleSchedules.length === 0 ? (
                <p className="text-center text-gray-400 py-8">
                  チケット情報がありません
                </p>
              ) : (
                <div className="space-y-6">
                  {event.saleSchedules.map((saleSchedule) => {
                    const saleStart = new Date(saleSchedule.saleStartAt);
                    const saleEnd = new Date(saleSchedule.saleEndAt);
                    const lotteryStart = saleSchedule.lotteryStartAt
                      ? new Date(saleSchedule.lotteryStartAt)
                      : null;
                    const lotteryResultAnnounce =
                      saleSchedule.lotteryResultAnnounceAt
                        ? new Date(saleSchedule.lotteryResultAnnounceAt)
                        : null;

                    return (
                      <div
                        key={saleSchedule.id}
                        className="border rounded-lg p-4 bg-gray-50 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {saleSchedule.name}
                            </h3>
                            {saleSchedule.publishStatus === 'PUBLISHED' ? (
                              <Badge className="bg-green-100 text-green-700 border-green-200 mt-1">
                                公開中
                              </Badge>
                            ) : (
                              <Badge className="bg-gray-100 text-gray-500 border-gray-200 mt-1">
                                下書き
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">募集期間: </span>
                            <span className="text-gray-900">
                              {format(saleStart, 'yyyy/MM/dd HH:mm')} ~{' '}
                              {format(saleEnd, 'MM/dd HH:mm')}
                            </span>
                          </div>

                          {lotteryStart && (
                            <div>
                              <span className="text-gray-600">
                                抽選予定日時:{' '}
                              </span>
                              <span className="text-gray-900">
                                {format(lotteryStart, 'yyyy/MM/dd HH:mm')}
                              </span>
                            </div>
                          )}

                          {lotteryResultAnnounce && (
                            <div>
                              <span className="text-gray-600">
                                抽選結果発表日時:{' '}
                              </span>
                              <span className="text-gray-900">
                                {format(
                                  lotteryResultAnnounce,
                                  'yyyy/MM/dd HH:mm',
                                )}
                              </span>
                            </div>
                          )}
                        </div>

                        {saleSchedule.ticketTypes &&
                          saleSchedule.ticketTypes.length > 0 && (
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">
                                チケット種別
                              </h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="text-left py-2 px-3 text-gray-700">
                                        券名
                                      </th>
                                      <th className="text-right py-2 px-3 text-gray-700">
                                        価格
                                      </th>
                                      <th className="text-right py-2 px-3 text-gray-700">
                                        枠数
                                      </th>
                                      <th className="text-right py-2 px-3 text-gray-700">
                                        制限
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {saleSchedule.ticketTypes.map(
                                      (ticketType) => (
                                        <tr
                                          key={ticketType.id}
                                          className="border-b hover:bg-gray-50"
                                        >
                                          <td className="py-2 px-3 text-gray-900">
                                            {ticketType.name}
                                          </td>
                                          <td className="py-2 px-3 text-right text-gray-900">
                                            ¥
                                            {ticketType.basePrice.toLocaleString()}
                                          </td>
                                          <td className="py-2 px-3 text-right text-gray-900">
                                            {ticketType.capacity.toLocaleString()}
                                          </td>
                                          <td className="py-2 px-3 text-right text-gray-900">
                                            {ticketType.maxNumPerApply}枚まで
                                          </td>
                                        </tr>
                                      ),
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </TabsContent>

          {/* その他のタブは空 */}
          <TabsContent value="sales">
            <div className="border rounded-lg p-6 bg-white">
              <p className="text-center text-gray-400 py-8">売上情報</p>
            </div>
          </TabsContent>

          <TabsContent value="applicants">
            <div className="border rounded-lg p-6 bg-white">
              <p className="text-center text-gray-400 py-8">申込者情報</p>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="border rounded-lg p-6 bg-white">
              <p className="text-center text-gray-400 py-8">お目当て情報</p>
            </div>
          </TabsContent>

          <TabsContent value="mail">
            <div className="border rounded-lg p-6 bg-white">
              <p className="text-center text-gray-400 py-8">メール情報</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
