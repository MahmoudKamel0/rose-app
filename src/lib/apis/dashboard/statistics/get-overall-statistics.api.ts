import { JSON_HEADER } from "@lib/constants/shared.constant";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function getOverallStatistics(): Promise<ApiResponse<OverallStatisticsResponseType>> {
    const token = await getDecodeToken();
    const headers: Record<string, string> = { ...JSON_HEADER };

    if (token?.accessToken) {
        headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    try {
        const res = await fetch(`${process.env.BASE_URL!}statistics/overall`, {
            method: "GET",
            headers,
        });

        if (!res.ok) return { error: "Something went wrong" };

        const response: ApiResponse<OverallStatisticsResponseType> = await res.json();
        if ("error" in response) {
            return { error: "Something went wrong" };
        }

        return response;
    } catch {
        return { error: "Something went wrong" };
    }
}
