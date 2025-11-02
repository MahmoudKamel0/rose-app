"use server";

import { VerifyOtpResponse } from "@lib/types/auth/verfiy";
import { EmailForgetPasswordValue } from "@lib/schemas/auth/forget-password-schema";
import { EmailForgetPasswordResponse } from "../_types/forget-password-email-response";

export async function verifyOtpAction(resetCode: string): Promise<VerifyOtpResponse> {
    const response = await fetch(`${process.env.BASE_URL}auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
    });

    const payload: VerifyOtpResponse = await response.json();

    return payload;
}

export async function SendForgetPasswordEmail(data: EmailForgetPasswordValue) {
    try {
        // define the headers as variable
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).

        const res = await fetch(`https://flower.elevateegy.com/api/v1/auth/forgotPassword`, {
            method: "POST",
            body: JSON.stringify(data),
            headers,
        });
        const response: ApiResponse<EmailForgetPasswordResponse> = await res.json();

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
