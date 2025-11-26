"use client";

export default function StatisictsSkeleton() {
    return (
        <div className="h-72 w-total animate-pulse rounded-2xl bg-gray-200 p-4 dark:bg-zinc-700">
            {/* Skeleton Icon */}
            <div className="mb-3">
                <div className="h-9 w-9 rounded-md bg-gray-300 dark:bg-zinc-600" />
            </div>

            {/* Skeleton Number */}
            <div className="flex items-center gap-2 text-2xl font-semibold">
                <div className="h-6 w-20 rounded bg-gray-300 dark:bg-zinc-600" />
                <div className="h-4 w-6 rounded bg-gray-300 dark:bg-zinc-600" />
            </div>

            {/* Skeleton Title */}
            <div className="mt-1">
                <div className="h-4 w-28 rounded bg-gray-300 dark:bg-zinc-600" />
            </div>
        </div>
    );
}
