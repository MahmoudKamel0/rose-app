import { useMutation } from "@tanstack/react-query";
import { deleteRequest } from "../_actions/delete-occasions";
import { DeleteOccasionResponse } from "@lib/types/dashboard/occasions";

export function useDeleteOccasion() {
    return useMutation({
        mutationFn: async (occasionId: string) => {
            const endpoint = `/occasions/${occasionId}`;
            return deleteRequest<DeleteOccasionResponse>(endpoint);
        },
    });
}
