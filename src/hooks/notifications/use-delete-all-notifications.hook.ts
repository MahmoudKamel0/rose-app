"use client";
import { DeleteAllNotifications } from "@lib/actions/notifications/notifications.action";
import { useMutation } from "@tanstack/react-query";

export function useDeleteAllNotifications() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: () => DeleteAllNotifications(),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
