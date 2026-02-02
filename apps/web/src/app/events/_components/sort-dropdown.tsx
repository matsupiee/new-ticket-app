'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

export type SortOption = {
  label: string;
  field: 'startAt' | 'createdAt';
  order: 'asc' | 'desc';
};

export const sortOptions: SortOption[] = [
  { label: '開催日新しい順', field: 'startAt', order: 'desc' },
  { label: '開催日古い順', field: 'startAt', order: 'asc' },
  { label: '作成日新しい順', field: 'createdAt', order: 'desc' },
  { label: '作成日古い順', field: 'createdAt', order: 'asc' },
];

type SortDropdownProps = {
  current: SortOption;
  onChange: (option: SortOption) => void;
};

export function SortDropdown({ current, onChange }: SortDropdownProps) {
  const Icon = current.order === 'asc' ? ArrowUp : ArrowDown;
  const fieldLabel = current.field === 'startAt' ? '開催日' : '作成日';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 border-gray-200">
          <Icon className="size-4" />
          {fieldLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((option) => (
          <DropdownMenuItem key={option.label} onClick={() => onChange(option)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
