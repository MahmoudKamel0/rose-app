"use server";

import { VerifyOtpResponse } from "@lib/types/auth/auth";

export async function verifyOtpAction(resetCode: string): Promise<VerifyOtpResponse> {
    const response = await fetch(`${process.env.BASE_URL}auth/verifyResetCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
    });

    const payload: VerifyOtpResponse = await response.json();

    return payload;
}
