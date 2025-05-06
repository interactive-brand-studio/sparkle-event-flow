
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface SkeletonLoaderProps {
  type?: 'card' | 'table' | 'list';
  count?: number;
}

const SkeletonLoader = ({ type = 'card', count = 1 }: SkeletonLoaderProps) => {
  const renderCardSkeleton = () => (
    <Card>
      <CardHeader className="pb-2 space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  const renderTableSkeleton = () => (
    <div className="space-y-3">
      <div className="flex gap-4 mb-1">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-32" />
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
      </div>
      <Skeleton className="h-[1px] w-full" />
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'table':
        return renderTableSkeleton();
      case 'list':
        return renderListSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index}>{renderSkeleton()}</div>
        ))}
    </div>
  );
};

export default SkeletonLoader;
