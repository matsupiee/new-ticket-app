'use client';

import { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { graphql } from '../../../libs/graphql/tada';
import { TicketCard } from './ticket-card';

const EventQuery = graphql(`
  query Event($id: ID!) {
    event(id: $id) {
      id
      title
      description
      venue
      date
      tickets {
        id
        name
        price
        stock
      }
    }
  }
`);

const EventUpdateMutation = graphql(`
  mutation EventUpdate($input: EventUpdateInput!) {
    eventUpdate(input: $input) {
      event {
        id
      }
    }
  }
`);

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');

  const [{ data, fetching, error }] = useQuery({
    query: EventQuery,
    variables: { id: eventId },
  });

  const [updateResult, updateEvent] = useMutation(EventUpdateMutation);

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

  const event = data?.event;

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600">イベントが見つかりませんでした。</p>
          <Link
            href="/events"
            className="text-gray-900 hover:underline mt-4 inline-block"
          >
            イベント一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // 編集モードに入る時にタイトルを初期化
  if (isEditing && title === '') {
    setTitle(event.title);
  }

  const handleSave = async () => {
    const { error } = await updateEvent({
      input: {
        id: eventId,
        title: title.trim(),
      },
    });

    if (error) {
      alert('更新に失敗しました');
    }

    setIsEditing(false);
    setTitle('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle('');
  };

  const tickets = event.tickets ?? [];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/events"
          className="text-gray-900 hover:underline mb-6 inline-block"
        >
          &larr; イベント一覧に戻る
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            {isEditing ? (
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-3xl font-bold text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="イベント名を入力"
                  autoFocus
                />
                {updateResult.error && (
                  <p className="text-red-600 text-sm mt-2">
                    {updateResult.error.message}
                  </p>
                )}
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-gray-900">
                {event.title}
              </h1>
            )}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={updateResult.fetching}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {updateResult.fetching ? '保存中...' : '保存'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={updateResult.fetching}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    キャンセル
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  編集
                </button>
              )}
            </div>
          </div>

          {event.description && (
            <p className="text-gray-600 mb-6">{event.description}</p>
          )}

          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
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
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
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
              <span>
                {new Date(event.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">チケット</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-600">
            このイベントには現在チケットがありません。
          </p>
        ) : (
          <div className="grid gap-4">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                eventId={event.id}
                eventName={event.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
