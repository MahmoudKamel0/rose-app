import { EmailForgetPasswordValue } from "@lib/schemas/forget-password-schema";
import { EmailForgetPasswordResponse } from "../_types/forget-password-email-response";

export async function SendForgetPasswordEmail(data: EmailForgetPasswordValue) {
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).

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
