"use server";

import { DeleteAllNotificationsRequest } from "@lib/types/delete-all-notifications";

export async function DeleteAllNotifications() {
    try {
        const token = process.env.ACCESS_TOKEN;
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(`${process.env.BASE_URL}${process.env.CLEAR_ALL_NOTIFICATION_URL}`, {
            method: "DELETE",
            headers,
        });
        const response: ApiResponse<DeleteAllNotificationsRequest> = await res.json();

        if ("error" in response) {
            throw new Error(response.error || "Something went wrong");
        }

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
