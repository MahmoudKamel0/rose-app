"use client";
import { useMutation } from "@tanstack/react-query";
import { MarkAllNotificationsAsRead } from "@lib/actions/mark-all-notifications-as-read.action";

export function useMarkAllNotificationsAsRead() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: () => MarkAllNotificationsAsRead(),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
