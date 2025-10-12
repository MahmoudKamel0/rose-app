"use client";
import { useMutation } from "@tanstack/react-query";

import { DeleteNotification } from "@lib/actions/notifications/notifications.action";

export function useDeleteSingleNotification() {
    const { mutateAsync, error, isPending, isSuccess } = useMutation({
        mutationFn: (notificationId: string) => DeleteNotification(notificationId),
    });
    return { mutateAsync, error, isPending, isSuccess };
}
