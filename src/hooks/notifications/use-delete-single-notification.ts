"use client";
import { useMutation } from "@tanstack/react-query";
import { DeleteNotification } from "@lib/actions/notifications/notifications.action";

export function useDeleteSingleNotification() {
    const { mutateAsync, error, isPending, isSuccess, isError } = useMutation({
        // mutationFn can throw manually so React Query handles it
        mutationFn: async (notificationId: string) => {
            const res = await DeleteNotification(notificationId);

            // check for your API's error structure
            if (!res) {
                throw new Error("No response from server");
            }

            if ("error" in res && res.error) {
                // throw to make React Query register an error
                throw new Error(res.error);
            }

            return res;
        },
    });

    return { mutateAsync, error, isPending, isSuccess, isError };
}
