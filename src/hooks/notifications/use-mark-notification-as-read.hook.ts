"use client";
import { MarkNotificationAsRead } from "@lib/actions//notifications/notifications.action";
import { MarkNotificationAsReadRequest } from "@lib/types/mark-single-notification-as-a-read";
import { useMutation } from "@tanstack/react-query";

export function useMarkNotificationsAsRead() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: (notificationId: MarkNotificationAsReadRequest) => MarkNotificationAsRead(notificationId),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
