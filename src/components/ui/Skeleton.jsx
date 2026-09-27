export function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={`animate-pulse rounded bg-silver-200/80 ${className}`} />;
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded border border-silver-200">
      <Skeleton className="aspect-video w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div role="status" aria-label="Loading product" className="container-page grid grid-cols-1 gap-10 py-12 sm:py-16 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export default Skeleton;
