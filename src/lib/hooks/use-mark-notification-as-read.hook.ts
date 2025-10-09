"use client";
import { useMutation } from "@tanstack/react-query";
import { MarkNotificationAsRead } from "@lib/actions/mark-notification-as-read.action";
import { MarkNotificationAsReadRequest } from "@lib/types/mark-single-notification-as-a-read";

export function useMarkNotificationsAsRead() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: (notificationId: MarkNotificationAsReadRequest) => MarkNotificationAsRead(notificationId),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
