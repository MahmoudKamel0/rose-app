import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constants";

export type Step = (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export type VerifyOtpResponse =
    | { status: "Success" } // success case
    | { error: string }; // error case

declare global {
    type LoginResponse = {
        token: string;
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            gender: string;
            phone: string;
            photo: string;
            role: string;
            wishlist: any[];
            addresses: string;
            createdAt: string;
        };
    };
}
