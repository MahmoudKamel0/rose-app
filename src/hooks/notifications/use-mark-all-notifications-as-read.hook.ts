"use client";
import { MarkAllNotificationsAsRead } from "@lib/actions/notifications/notifications.action";
import { useMutation } from "@tanstack/react-query";

export function useMarkAllNotificationsAsRead() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: () => MarkAllNotificationsAsRead(),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
