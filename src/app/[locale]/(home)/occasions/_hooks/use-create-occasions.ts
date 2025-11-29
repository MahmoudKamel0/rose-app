import { useMutation } from "@tanstack/react-query";
import { CreateOccasionResponse } from "@/lib/types/dashboard/occasions";
import { createOccasion } from "../_actions/create-occasions";

export function useCreateOccasion() {
    // Mutation
    return useMutation({
        mutationFn: async (formData: FormData) => {
            return createOccasion<CreateOccasionResponse>(formData);
        },
    });
}
