"use server";

import { RegisterInput } from "@lib/schemas/auth.schema";

// Server action to register a new user
export async function registerAction(data: RegisterInput) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const payload = await res.json();

    return payload;
}
