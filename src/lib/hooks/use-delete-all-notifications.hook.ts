"use client";
import { useMutation } from "@tanstack/react-query";
import { DeleteAllNotifications } from "@lib/actions/delete-all-notifications.action";

export function useDeleteAllNotifications() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: () => DeleteAllNotifications(),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
