'use client';

import { useMemo, useState } from 'react';
import { useQuery } from 'urql';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Mic, Pencil, Plus } from 'lucide-react';
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
import { EditEventDialog } from './_components/edit-event-dialog';
import { EditStagesDialog } from './_components/edit-stages-dialog';
import { EditSaleScheduleDialog } from './_components/edit-sale-schedule-dialog';
import { CreateSaleScheduleDialog } from './_components/create-sale-schedule-dialog';
import { EditTicketTypeDialog } from './_components/edit-ticket-type-dialog';
import { CreateTicketTypeDialog } from './_components/create-ticket-type-dialog';
import { EventDetailHeader } from './_components/event-detail-header';
import { SaleSchedules } from './_components/sale-schedules';

const EventDetailQuery = graphql(`
  query EventDetail($id: ID!) {
    event(id: $id) {
      id
      name
      description
      inquiry
      publishStatus
      thumbnailUrls
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
      saleSchedules {
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
        ticketTypes {
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
  }
`);

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [activeTab, setActiveTab] = useState('event');
  const [editEventDialogOpen, setEditEventDialogOpen] = useState(false);
  const [editStagesDialogOpen, setEditStagesDialogOpen] = useState(false);
  const [editSaleScheduleDialogOpen, setEditSaleScheduleDialogOpen] =
    useState(false);
  const [createSaleScheduleDialogOpen, setCreateSaleScheduleDialogOpen] =
    useState(false);
  const [selectedSaleScheduleId, setSelectedSaleScheduleId] = useState<
    string | null
  >(null);
  const [editTicketTypeDialogOpen, setEditTicketTypeDialogOpen] =
    useState(false);
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState<
    string | null
  >(null);
  const [createTicketTypeDialogOpen, setCreateTicketTypeDialogOpen] =
    useState(false);
  const [
    selectedSaleScheduleIdForTicketType,
    setSelectedSaleScheduleIdForTicketType,
  ] = useState<string | null>(null);

  const [{ data, fetching, error }] = useQuery({
    query: EventDetailQuery,
    variables: { id: eventId },
    context: useMemo(
      () => ({ additionalTypenames: ['Event', 'Stage', 'SaleSchedule', 'TicketType'] }),
      [],
    ),
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
        <EventDetailHeader event={event} />

        {/* タブ */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditEventDialogOpen(true)}
                  >
                    <Pencil className="size-4 mr-2" />
                    イベント情報を編集
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditStagesDialogOpen(true)}
                  >
                    <Pencil className="size-4 mr-2" />
                    公演情報を編集
                  </Button>
                </div>
              </div>

              <div className="flex gap-8">
                {/* 左側：画像 */}
                <div className="flex-shrink-0">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={event.name}
                      width={250}
                      height={250}
                      className="max-w-[250px] h-[250px] object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-[250px] h-[250px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* 右側：URL情報と公演リスト */}
                <div className="flex-1 space-y-6 min-w-0">
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

                  {/* 公演リスト */}
                  <div className="space-y-4">
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

                          {stage.stageArtists &&
                            stage.stageArtists.length > 0 && (
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
              </div>
            </div>
          </TabsContent>

          {/* チケット情報タブ */}
          <TabsContent value="tickets" className="space-y-6">
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  チケット情報
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCreateSaleScheduleDialogOpen(true)}
                >
                  <Plus className="size-4 mr-2" />
                  販売スケジュールを新規作成
                </Button>
              </div>

              <SaleSchedules
                saleSchedules={event.saleSchedules || []}
                onEditSaleSchedule={(scheduleId) => {
                  setSelectedSaleScheduleId(scheduleId);
                  setEditSaleScheduleDialogOpen(true);
                }}
                onCreateTicketType={(scheduleId) => {
                  setSelectedSaleScheduleIdForTicketType(scheduleId);
                  setCreateTicketTypeDialogOpen(true);
                }}
                onEditTicketType={(ticketTypeId) => {
                  setSelectedTicketTypeId(ticketTypeId);
                  setEditTicketTypeDialogOpen(true);
                }}
              />
            </div>
          </TabsContent>

          {[
            { value: 'sales', label: '売上情報' },
            { value: 'applicants', label: '申込者情報' },
            { value: 'favorites', label: 'お目当て情報' },
            { value: 'mail', label: 'メール情報' },
          ].map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="border rounded-lg p-6 bg-white">
                <p className="text-center text-gray-400 py-8">{tab.label}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* 編集ダイアログ */}
        {data?.event && (
          <>
            <EditEventDialog
              open={editEventDialogOpen}
              onOpenChange={setEditEventDialogOpen}
              event={{
                id: data.event.id,
                name: data.event.name,
                description: data.event.description || '',
                inquiry: data.event.inquiry || '',
              }}
            />
            <EditStagesDialog
              open={editStagesDialogOpen}
              onOpenChange={setEditStagesDialogOpen}
              event={{
                id: data.event.id,
                name: data.event.name,
                stages: data.event.stages?.map((stage) => ({
                  id: stage.id,
                  name: stage.name || '',
                  doorsOpenAt: stage.doorsOpenAt,
                  startAt: stage.startAt,
                  venue: stage.venue,
                  stageArtists: stage.stageArtists,
                })),
              }}
            />
            {selectedSaleScheduleId &&
              data.event.saleSchedules?.find(
                (s) => s.id === selectedSaleScheduleId,
              ) && (
                <EditSaleScheduleDialog
                  open={editSaleScheduleDialogOpen}
                  onOpenChange={setEditSaleScheduleDialogOpen}
                  saleSchedule={
                    data.event.saleSchedules.find(
                      (s) => s.id === selectedSaleScheduleId,
                    )!
                  }
                  onSuccess={() => setSelectedSaleScheduleId(null)}
                />
              )}
            <CreateSaleScheduleDialog
              open={createSaleScheduleDialogOpen}
              onOpenChange={setCreateSaleScheduleDialogOpen}
              eventId={data.event.id}
            />
            {selectedTicketTypeId &&
              (() => {
                const ticketType = data.event.saleSchedules
                  ?.flatMap((s) => s.ticketTypes ?? [])
                  .find((t) => t.id === selectedTicketTypeId);
                return (
                  ticketType && (
                    <EditTicketTypeDialog
                      open={editTicketTypeDialogOpen}
                      onOpenChange={setEditTicketTypeDialogOpen}
                      ticketType={{
                        id: ticketType.id,
                        name: ticketType.name,
                        description: ticketType.description,
                        seatType: ticketType.seatType as 'RESERVED' | 'ENTRY_NUMBER' | 'FREE',
                        basePrice: ticketType.basePrice,
                        capacity: ticketType.capacity,
                        maxNumPerApply: ticketType.maxNumPerApply,
                        isOnceApplyOnly: ticketType.isOnceApplyOnly,
                        isOnlyQrCodeEntry: ticketType.isOnlyQrCodeEntry,
                      }}
                      onSuccess={() => setSelectedTicketTypeId(null)}
                    />
                  )
                );
              })()}
            {selectedSaleScheduleIdForTicketType && (
              <CreateTicketTypeDialog
                open={createTicketTypeDialogOpen}
                onOpenChange={setCreateTicketTypeDialogOpen}
                saleScheduleId={selectedSaleScheduleIdForTicketType}
                onSuccess={() => setSelectedSaleScheduleIdForTicketType(null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
