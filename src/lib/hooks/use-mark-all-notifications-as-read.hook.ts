"use client";
import { useMutation } from "@tanstack/react-query";
import { MarkAllNotificationsAsRead } from "@lib/actions/notifications/notifications.action";

export function useMarkAllNotificationsAsRead() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: () => MarkAllNotificationsAsRead(),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
