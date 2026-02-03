'use client';

import { useState } from 'react';
import { useMutation } from 'urql';
import { graphql } from '../../../../libs/graphql/tada';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { PublishConfirmationDialog } from './publish-confirmation-dialog';
import { UnpublishConfirmationDialog } from './unpublish-confirmation-dialog';

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
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [showUnpublishDialog, setShowUnpublishDialog] = useState(false);

  const handlePublish = async () => {
    const result = await updatePublishStatus({
      input: { id: event.id, publishStatus: 'PUBLISHED' },
    });
    if (result.error) {
      console.error('Error updating publish status:', result.error);
      alert(`エラーが発生しました: ${result.error.message}`);
    } else {
      setShowPublishDialog(false);
    }
  };

  const handleUnpublish = async () => {
    const result = await updatePublishStatus({
      input: { id: event.id, publishStatus: 'UNPUBLISHED' },
    });
    if (result.error) {
      console.error('Error updating publish status:', result.error);
      alert(`エラーが発生しました: ${result.error.message}`);
    } else {
      setShowUnpublishDialog(false);
    }
  };

  const isPublished = event.publishStatus === 'PUBLISHED';

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-500">ID: {event.id}</p>
            {isPublished ? (
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
          variant={isPublished ? 'outline' : 'default'}
          disabled={updatePublishStatusResult.fetching}
          onClick={() =>
            isPublished
              ? setShowUnpublishDialog(true)
              : setShowPublishDialog(true)
          }
        >
          {updatePublishStatusResult.fetching
            ? '更新中...'
            : isPublished
              ? '非公開にする'
              : '公開する'}
        </Button>
      </div>

      <PublishConfirmationDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        onConfirm={handlePublish}
        event={event}
      />

      <UnpublishConfirmationDialog
        open={showUnpublishDialog}
        onOpenChange={setShowUnpublishDialog}
        onConfirm={handleUnpublish}
        event={event}
      />
    </>
  );
}

