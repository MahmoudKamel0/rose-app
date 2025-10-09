"use server";

import { DeletSingleNotification } from "@lib/types/delete-notifications";

export async function DeleteNotification(notification_id: string) {
    try {
        const token = process.env.ACCESS_TOKEN;
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(
            // `${process.env.BASE_URL!}${process.env.CHECK_QUESTIONS!}`,
            `${process.env.BASE_URL}/${process.env.DELETE_SINGLE_NOTIFICATION}/${notification_id}`,
            {
                method: "DELETE",
                headers,
            }
        );

        const response: ApiResponse<DeletSingleNotification> = await res.json();

        if ("error" in response) {
            throw new Error(response.error || "Something went wrong");
        }

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
