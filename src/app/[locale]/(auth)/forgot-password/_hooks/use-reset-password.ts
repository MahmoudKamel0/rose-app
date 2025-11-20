import { ResetPasswordAction } from "../_actions/forget-password.actions";
import { ResetPasswordRequest } from "../_types/reset-password";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
    const { mutateAsync, error, isPending } = useMutation({
        mutationFn: async (data: ResetPasswordRequest) => {
            const res = await ResetPasswordAction(data);
            if (!res) {
                throw new Error("No response from server");
            }

            if ("error" in res) {
                // throw to make React Query register an error
                throw new Error(res.error);
            }

            return res;
        },
    });
    return { mutateAsync, error, isPending };
}
