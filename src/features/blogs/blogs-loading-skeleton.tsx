import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { dummyArray } from '@/lib/utils';

export default function BlogsLoadingSkeleton() {
  return (
    <div className="mt-4 md:mt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {dummyArray(10).map((_, i) => (
        <Card className="rounded-sm overflow-hidden" key={i}>
          <Skeleton className="aspect-video h-auto" />
          <CardContent className="px-4 py-2 space-y-3">
            <Skeleton className="rounded-full w-12 h-4" />
            <div className="space-y-0.5">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-36 h-4" />
            </div>
            <div className="space-y-0.5">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-36 h-3" />
            </div>

            <div className="flex items-center gap-4">
              <Skeleton className="size-10 rounded-full" />
              <div className="space-y-0.5">
                <Skeleton className="w-36 h-4" />
                <Skeleton className="w-28 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
