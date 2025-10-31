import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsSectionSkeleton() {
    return (
        <div className="flex-1 animate-pulse border-b border-gray-200 pb-4 dark:border-gray-700">
            {/* Rating info */}
            <div className="mt-4 space-y-2">
                {/* General rating label */}
                <Skeleton className="h-5 w-48 rounded-md bg-gray-200 dark:bg-gray-700" />
                {/* Average rating */}
                <Skeleton className="h-7 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
                <div className="flex space-x-2">
                    {/* Rating stars */}
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
            </div>
        </div>
    );
}
