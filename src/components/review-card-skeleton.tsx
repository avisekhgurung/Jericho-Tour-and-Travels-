export function ReviewCardSkeleton() {
  return (
    <article className="flex animate-pulse flex-col rounded-xl bg-white p-5 shadow-md sm:rounded-2xl sm:p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="size-12 shrink-0 rounded-full bg-gray-200" />
        <div className="min-w-0 flex-1">
          <div className="h-3.5 w-2/5 rounded bg-gray-200" />
          <div className="mt-1.5 h-3 w-1/3 rounded bg-gray-100" />
        </div>
        <div className="h-4 w-12 rounded bg-gray-100" />
      </div>
      <div className="mb-3 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="size-4 rounded-sm bg-gray-200" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded bg-gray-100" />
        <div className="h-3 rounded bg-gray-100" />
        <div className="h-3 w-4/5 rounded bg-gray-100" />
      </div>
    </article>
  );
}
