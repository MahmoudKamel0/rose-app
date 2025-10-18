import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constants";

export type Step = (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export type VerifyOtpResponse =
    | { status: "Success" } // success case
    | { error: string }; // error case
