'use client';

import { Search, X } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';

type EventSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function EventSearch({ value, onChange }: EventSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="公演名/会場名で検索"
        className="pl-10 pr-10 border-gray-200"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 p-0.5 hover:bg-gray-300 transition-colors"
        >
          <X className="size-3.5 text-gray-500" />
        </button>
      )}
    </div>
  );
}
