import { useMutation } from "@tanstack/react-query";

import { verifyOtpAction } from "../_actions/verify-otp-action";
import { VerifyOtpResponse } from "@lib/types/auth/auth";

export function useVerifyOtp() {
    const { isPending, error, mutateAsync } = useMutation({
        mutationFn: async (resetCode: string): Promise<VerifyOtpResponse> => {
            const payload = await verifyOtpAction(resetCode);

            if ("error" in payload) {
                throw new Error(payload.error);
            }

            return payload;
        },
    });

    return { isPending, error, verifyOtp: mutateAsync };
}
