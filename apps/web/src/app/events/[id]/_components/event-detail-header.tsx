'use client';

import { useMutation } from 'urql';
import { graphql } from '../../../../libs/graphql/tada';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';

const EventUpdatePublishStatusMutation = graphql(`
  mutation EventUpdatePublishStatus($input: EventUpdatePublishStatusInput!) {
    eventUpdatePublishStatus(input: $input) {
      event {
        id
        publishStatus
      }
    }
  }
`);

export function EventDetailHeader({
  event,
}: {
  event: {
    id: string;
    name: string;
    publishStatus: string | null;
  };
}) {
  const [updatePublishStatusResult, updatePublishStatus] = useMutation(
    EventUpdatePublishStatusMutation,
  );

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-gray-500">ID: {event.id}</p>
          {event.publishStatus === 'PUBLISHED' ? (
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              公開中
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-500 border border-gray-200"
            >
              下書き
            </Badge>
          )}
        </div>
      </div>
      <Button
        variant={event.publishStatus === 'PUBLISHED' ? 'outline' : 'default'}
        disabled={updatePublishStatusResult.fetching}
        onClick={async () => {
          const nextStatus =
            event.publishStatus === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED';
          const result = await updatePublishStatus({
            input: { id: event.id, publishStatus: nextStatus },
          });
          if (result.error) {
            console.error('Error updating publish status:', result.error);
            alert(`エラーが発生しました: ${result.error.message}`);
          }
        }}
      >
        {updatePublishStatusResult.fetching
          ? '更新中...'
          : event.publishStatus === 'PUBLISHED'
            ? '非公開にする'
            : '公開する'}
      </Button>
    </div>
  );
}
