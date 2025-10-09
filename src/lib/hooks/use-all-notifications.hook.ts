"use client";

import { AllNotificationsResponse } from "@lib/types/all-notifications";
// import useInfinityQuery
import { useInfiniteQuery } from "@tanstack/react-query";

//  custom hook to fetch all notifications with pagination
export function useAllNotifications(limit: number = 6) {
    let index = 0;
    index++;
    return useInfiniteQuery<AllNotificationsResponse>({
        queryKey: [`all-notifications-${index}-${limit}`],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetch(`/api/get-all-notifications?limit=${limit}&page=${pageParam}`);
            if (!res.ok) throw new Error("Failed to fetch notifications");

            return res.json();
        },
        getNextPageParam: (lastPage) => {
            const metadata = lastPage?.data.metadata;
            if (!metadata) return undefined;
            if (metadata.currentPage < metadata.totalPages) return metadata.currentPage + 1;
            return undefined;
        },
        initialPageParam: 1,
    });
}
