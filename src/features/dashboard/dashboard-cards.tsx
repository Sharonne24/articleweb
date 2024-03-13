import { useQueries } from '@tanstack/react-query';

import { Card, CardContent } from '@/components/ui/card';
import StatCard from './stat-card';
import { Skeleton } from '@/components/ui/skeleton';
import { totalBlogs, totalViews, unPublishedBlogs } from '@/services/blogApi';

export default function DashboardCards() {
  const result = useQueries({
    queries: [
      { queryKey: ['blog-count'], queryFn: totalBlogs },
      { queryKey: ['views-count'], queryFn: totalViews },
      { queryKey: ['unpublished-count'], queryFn: unPublishedBlogs },
    ],
  });

  const isLoading =
    result[0].isLoading || result[1].isLoading || result[2].isLoading;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
      ) : (
        <>
          <StatCard title="Total blogs" value={result[0]?.data ?? 0} />
          <StatCard title="Cummulative views" value={result[1]?.data ?? 0} />
          <StatCard title="Unpublished blogs" value={result[2]?.data ?? 0} />
          <StatCard title="Number of authors" value={1} />
        </>
      )}
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card>
      <CardContent className="py-4 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-6" />
      </CardContent>
    </Card>
  );
}
