"use client";

import { OccasionsResponse } from "@lib/types/end-point-api/occasions";
import { useQuery } from "@tanstack/react-query";

export function useOccasions() {
    const {
        error,
        isPending,
        data: occasionData,
    } = useQuery<OccasionsResponse>({
        queryKey: ["get-dashboard-occasions"],
        queryFn: async () => {
            const res = await fetch(`/api/get-dashboard-occasions`);

            const response: ApiResponse<OccasionsResponse> = await res.json();
            if ("error" in response) {
                throw new Error(`${response.error}`);
            }

            return response;
        },
    });

    return {
        isPending,
        occasionData,
        error,
    };
}
