import { JSON_HEADER } from "@lib/constants/shared.constant";
import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function getOverallStatistics(): Promise<OverallStatisticsResponseType | string> {
    const token = await getDecodeToken();
    const headers: Record<string, string> = { ...JSON_HEADER };

    if (token?.accessToken) {
        headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    try {
        const res = await fetch(`${process.env.BASE_URL!}statistics/overall`, {
            method: "GET",
            headers,
            cache: "no-store",
        });

        if (!res.ok) return "Something went wrong";

        const response: ApiResponse<OverallStatisticsResponseType> = await res.json();
        if ("error" in response) {
            return "Something went wrong";
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { message, ...rest } = response;

        return rest;
    } catch {
        return "Something went wrong";
    }
}
export async function getAllCategories(): Promise<AllCategoriesResponseType | string> {
    const token = await getDecodeToken();
    const headers: Record<string, string> = { ...JSON_HEADER };

    if (token?.accessToken) {
        headers["Authorization"] = `Bearer ${token.accessToken}`;
    }

    try {
        const res = await fetch(`${process.env.BASE_URL!}statistics/categories`, {
            method: "GET",
            headers,
        });

        if (!res.ok) return "Something went wrong";

        const response: ApiResponse<AllCategoriesResponseType> = await res.json();
        if ("error" in response) {
            return "Something went wrong";
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { message, ...rest } = response;

        return rest;
    } catch {
        return "Something went wrong";
    }
}
