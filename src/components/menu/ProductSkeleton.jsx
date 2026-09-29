export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-black/10 bg-white">
      <div className="h-44 bg-black/5" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-black/10" />
        <div className="h-3 w-full rounded bg-black/5" />
        <div className="h-3 w-4/5 rounded bg-black/5" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-14 rounded-full bg-black/5" />
          <div className="h-6 w-14 rounded-full bg-black/5" />
          <div className="h-6 w-14 rounded-full bg-black/5" />
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="h-6 w-20 rounded bg-black/10" />
          <div className="h-10 w-28 rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  );
}
