import { ResetPasswordRequest, ResetPasswordResponse } from "../_types/reset-password";

export async function ResetPasswordAction(data: ResetPasswordRequest) {
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE!}/${process.env.RESET_PASSWORD_URL!}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers,
        });
        const response: ApiResponse<ResetPasswordResponse> = await res.json();
        if ("error" in response) {
            return response;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { token, ...rest } = response;
        return rest;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
