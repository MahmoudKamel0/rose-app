import { useMutation } from "@tanstack/react-query";
import { updateOccasion } from "../_actions/update-occasions";

interface UpdateOccasionParams {
    occasionId: string;
    data: { name: string };
}

export function useUpdateOccasion() {
    // Mutation
    return useMutation({
        mutationFn: async ({ occasionId, data }: UpdateOccasionParams) => {
            return updateOccasion(occasionId, data);
        },
    });
}
