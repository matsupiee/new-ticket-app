import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge';

type EventCardProps = {
  id: string;
  title: string;
  venue: string;
  date: string;
  isEnded: boolean;
};

export function EventCard({ id, title, venue, date, isEnded }: EventCardProps) {
  const eventDate = new Date(date);
  const month = eventDate.getMonth() + 1;
  const day = eventDate.getDate();
  const dayOfWeek = eventDate.toLocaleDateString('ja-JP', {
    weekday: 'long',
  });
  const time = eventDate.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <Link
      href={`/events/${id}`}
      className="flex items-center justify-between border-b border-gray-100 px-2 py-5 hover:bg-gray-50 transition-colors"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">
            {month}月{day}日
          </span>
          <span>{dayOfWeek}</span>
          <span>{time}</span>
          {isEnded ? (
            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-500 border border-gray-200"
            >
              終了
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              公開中
            </Badge>
          )}
        </div>
        <p className="font-semibold text-gray-900">{title}</p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="size-3.5" />
          <span>{venue}</span>
        </div>
      </div>
      <div className="ml-4 h-20 w-28 shrink-0 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">
        No Image
      </div>
    </Link>
  );
}
