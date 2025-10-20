"use server";

import { EmailForgetPasswordValue } from "@lib/schemas/auth/forget-password-schema";
import { EmailForgetPasswordResponse } from "../_types/forget-password-email-response";
import { ResetPasswordRequest, ResetPasswordResponse } from "../_types/reset-password";

// Add forget password email
export async function SendForgetPasswordEmail(data: EmailForgetPasswordValue) {
    try {
        // define the headers as variable
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        const res = await fetch(`${process.env.BASE_URL!}${process.env.FORGET_PASSWORD_URL!}`, {
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

// reset Password Action (update password)

export async function ResetPasswordAction(data: ResetPasswordRequest) {
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        const res = await fetch(`${process.env.BASE_URL!}${process.env.RESET_PASSWORD_URL!}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers,
        });
        const response: ApiResponse<ResetPasswordResponse> = await res.json();

        // check if error
        if ("error" in response) {
            return response;
        }
        //  remove token from the response to  kae it more safe
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, ...rest } = response;
        return rest;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
