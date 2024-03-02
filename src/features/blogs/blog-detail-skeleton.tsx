import { Skeleton } from '@/components/ui/skeleton';

export default function BlogDetailSkeleton() {
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-3 w-32 block" />
        <Skeleton className="h-5 w-full md:w-[600px] block" />
        <div className="space-y-1">
          <Skeleton className="w-full md:w-[540px] h-2" />
          <Skeleton className="w-full md:w-[540px] h-2" />
          <Skeleton className="w-full md:w-[480px] h-2" />
        </div>
      </div>
      <Skeleton className="aspect-video w-full h-auto mt-6" />
    </>
  );
}
