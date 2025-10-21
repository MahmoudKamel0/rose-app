import { EmailForgetPasswordValue } from "@lib/schemas/auth/forget-password-schema";
import { useMutation } from "@tanstack/react-query";
import { SendForgetPasswordEmail } from "../_actions/forget-password.actions";
import { EmailForgetPasswordResponse } from "../_types/forget-password-email-response";

export function useAddForgetPasswordEmail() {
    const { mutateAsync, error, isPending } = useMutation({
        mutationFn: async (email: EmailForgetPasswordValue) => {
            const res: ApiResponse<EmailForgetPasswordResponse> = await SendForgetPasswordEmail(email);
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
