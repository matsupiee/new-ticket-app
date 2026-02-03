'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

export function UnpublishConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  event,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  event: {
    id: string;
    name: string;
  };
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>イベントの非公開確認</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p>以下のイベントを非公開にしてもよろしいですか?</p>
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">イベント名</p>
                  <p className="text-sm font-medium text-foreground">
                    {event.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">イベントID</p>
                  <p className="text-sm font-medium text-foreground font-mono">
                    {event.id}
                  </p>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            非公開にする
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
