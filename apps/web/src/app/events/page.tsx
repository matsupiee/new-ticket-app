'use client';

import { useQuery } from 'urql';
import Link from 'next/link';
import { graphql } from '../../libs/graphql/tada';

const EventsQuery = graphql(`
  query Events($first: Int) {
    events(first: $first, orderBy: [{ date: asc }]) {
      nodes {
        id
        title
        description
        venue
        date
      }
      totalCount
    }
  }
`);

export default function EventsPage() {
  const [{ data, fetching, error }] = useQuery({
    query: EventsQuery,
    variables: { first: 20 },
  });

  const events = data?.events.nodes ?? [];

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600">エラーが発生しました: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">イベント一覧</h1>

        {events.length === 0 ? (
          <p className="text-gray-600">イベントがありません。</p>
        ) : (
          <div className="grid gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h2>
                {event.description && (
                  <p className="text-gray-600 mb-4">{event.description}</p>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.venue}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(event.date).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-gray-500">
          全 {data?.events.totalCount ?? 0} 件のイベント
        </p>
      </div>
    </div>
  );
}
