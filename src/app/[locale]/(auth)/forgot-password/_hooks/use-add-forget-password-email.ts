import { EmailForgetPasswordValue } from "@lib/schemas/forget-password-schema";
import { useMutation } from "@tanstack/react-query";
import { SendForgetPasswordEmail } from "../_actions/send-forget-password-email.action";

export function useAddForgetPasswordEmail() {
    const { mutateAsync, error, isPending } = useMutation({
        mutationFn: async (data: EmailForgetPasswordValue) => {
            const res = await SendForgetPasswordEmail(data);
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
    return { mutateAsync, error, isPending };
}
