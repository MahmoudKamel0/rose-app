import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsListSkeleton() {
    return (
        <section className="mt-6 h-[15.4rem] flex-1 animate-pulse space-y-[0.6rem] overflow-y-auto">
            {/* Each review */}
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border-b border-gray-200 pb-6 last:border-none dark:border-gray-700">
                    {/* Header */}
                    <div className="mb-3 flex items-center">
                        <Skeleton className="relative mr-[0.44rem] h-11 w-11 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div className="space-y-1">
                            <Skeleton className="h-4 w-28 rounded-md bg-gray-200 dark:bg-gray-700" /> {/* name */}
                            <Skeleton className="h-3 w-20 rounded-md bg-gray-200 dark:bg-gray-700" /> {/* date */}
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-2 flex items-center space-x-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
                        ))}
                        {/* numeric rating */}
                        <Skeleton className="h-4 w-10 rounded-md bg-gray-200 dark:bg-gray-700" />
                    </div>

                    {/* Title */}
                    <Skeleton className="mb-1 h-4 w-40 rounded-md bg-gray-200 dark:bg-gray-700" />

                    {/* Comment */}
                    <Skeleton className="h-12 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
                </div>
            ))}
        </section>
    );
}
