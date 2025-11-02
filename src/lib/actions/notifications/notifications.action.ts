"use server";

import { getDecodeToken } from "@lib/utils/get-decode-token";

export async function MarkAllNotificationsAsRead() {
    try {
        const token = await getDecodeToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL}${process.env.MARK_ALL_NOTIFICATION_AS_READ_URL}`, {
            method: "POST",
            headers,
        });
        const response: ApiResponse<MarkAllNotificationsAsReadRequest> = await res.json();

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}

import { MarkNotificationAsReadRequest } from "@lib/types/mark-single-notification-as-a-read";

export async function MarkNotificationAsRead(notificationIds: MarkNotificationAsReadRequest) {
    try {
        const token = await getDecodeToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(
            // `${process.env.BASE_URL!}${process.env.CHECK_QUESTIONS!}`,
            // `${process.env.BASE_URL}${process.env.MARK_NOTIFICATION_AS_READ_UR}`,
            `${process.env.BASE_URL}${process.env.MARK_NOTIFICATION_AS_READ_URL}`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(notificationIds),
            }
        );

        const response: ApiResponse<MarkAllNotificationsAsReadRequest> = await res.json();

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}

import { DeleteAllNotificationsRequest } from "@lib/types/end-point-api/delete-all-notifications";

export async function DeleteAllNotifications() {
    try {
        const token = await getDecodeToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(`${process.env.BASE_URL}${process.env.CLEAR_ALL_NOTIFICATION_URL}`, {
            method: "DELETE",
            headers,
        });
        const response: ApiResponse<DeleteAllNotificationsRequest> = await res.json();

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}

import { DeleteSingleNotificationResponse } from "@lib/types/end-point-api/delete-notifications";

export async function DeleteNotification(notification_id: string) {
    try {
        const token = await getDecodeToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token.accessToken}`;
        }

        const res = await fetch(
            // `${process.env.BASE_URL!}${process.env.CHECK_QUESTIONS!}`,
            `${process.env.BASE_URL}/${process.env.DELETE_SINGLE_NOTIFICATION}/${notification_id}`,
            {
                method: "DELETE",
                headers,
            }
        );

        const response: ApiResponse<DeleteSingleNotificationResponse> = await res.json();

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
