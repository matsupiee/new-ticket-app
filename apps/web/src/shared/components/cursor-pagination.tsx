'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

type Props = {
  onNextAction: () => void;
  onPreviousAction: () => void;
  totalPage: number;
  currentPage: number;
};

export function CursorPagination({
  onNextAction,
  onPreviousAction,
  totalPage,
  currentPage,
}: Props) {
  return (
    <div className="flex items-center justify-center my-4">
      <Button
        variant="outline"
        size="sm"
        aria-label="previous page"
        onClick={onPreviousAction}
        disabled={currentPage <= 1}
        className="mr-3"
      >
        <ChevronLeft className="size-4" />
      </Button>

      <div className="flex items-center flex-shrink-0 mx-6 text-sm">
        Page
        <span className="font-bold mx-2">{currentPage}</span>
        of
        <span className="font-bold mx-2">{totalPage}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        aria-label="next page"
        onClick={onNextAction}
        disabled={currentPage >= totalPage}
        className="mr-3"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
