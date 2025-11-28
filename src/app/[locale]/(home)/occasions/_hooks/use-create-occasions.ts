import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOccasionResponse } from "@/lib/types/dashboard/occasions";
import { createOccasion } from "../_actions/create-occasions";

export function useCreateOccasion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            return createOccasion<CreateOccasionResponse>(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["occasions"] });
        },
    });
}
