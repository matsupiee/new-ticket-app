'use client';

import { useMemo, useState } from 'react';
import { useQuery } from 'urql';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { graphql, ResultOf } from '../../../libs/graphql/tada';
import { Button } from '@/shared/components/ui/button';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared/components/ui/tabs';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { EventCard } from './_components/event-card';
import { EventSearch } from './_components/event-search';
import { SortDropdown, type SortOption } from './_components/sort-dropdown';

const EventsQuery = graphql(`
  query Events(
    $first: Int
    $orderBy: [EventOrderByWithRelationInput!]
    $where: EventWhereInput
  ) {
    events(first: $first, orderBy: $orderBy, where: $where) {
      nodes {
        id
        createdAt
        name
        description
      }
      totalCount
    }
  }
`);

type EventNode = ResultOf<typeof EventsQuery>['events']['nodes'][number];

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>({
    label: '作成日新しい順',
    field: 'createdAt',
    order: 'desc',
  });
  const [tab, setTab] = useState('active');

  const [{ data, fetching, error }] = useQuery({
    query: EventsQuery,
    variables: {
      first: 50,
      orderBy: [{ [sort.field]: sort.order }],
      where: {
        name: { contains: search },
      },
    },
  });

  const events = (data?.events.nodes ?? []) as EventNode[];

  return (
    <div className="flex-1 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">イベント一覧</h1>
          <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
            <Link href="/events/new">
              <Plus className="size-4" />
              作成
            </Link>
          </Button>
        </div>

        <div className="mb-6">
          <EventSearch value={search} onChange={setSearch} />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList variant="line">
              <TabsTrigger value="active">下書き/公開</TabsTrigger>
              <TabsTrigger value="ended">イベント終了</TabsTrigger>
            </TabsList>
            <SortDropdown current={sort} onChange={setSort} />
          </div>

          <TabsContent value="active">
            <EventList
              fetching={fetching}
              error={error}
              events={events}
              isEndedTab={false}
            />
          </TabsContent>

          <TabsContent value="ended">
            <EventList
              fetching={fetching}
              error={error}
              events={events}
              isEndedTab={true}
            />
          </TabsContent>
        </Tabs>

        {data && (
          <p className="mt-6 text-sm text-gray-400">
            全 {data.events.totalCount} 件
          </p>
        )}
      </div>
    </div>
  );
}

function EventList({
  fetching,
  error,
  events,
  isEndedTab,
}: {
  fetching: boolean;
  error?: { message: string };
  events: EventNode[];
  isEndedTab: boolean;
}) {
  if (fetching) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-5 px-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-20 w-28 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <p className="text-center text-red-600">
          エラーが発生しました: {error.message}
        </p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="py-8">
        <p className="text-center text-gray-400">イベントがありません</p>
      </div>
    );
  }

  return (
    <div className="min-h-[200px]">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          title={event.name}
          venue=""
          date={event.createdAt}
          isEnded={isEndedTab}
        />
      ))}
    </div>
  );
}
