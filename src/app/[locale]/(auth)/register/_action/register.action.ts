import { RegisterInput } from "@lib/schemes/auth.schema";

export async function registerAction(data: RegisterInput) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Something went wrong");
        }

        return await res.json();
    } catch (err: any) {
        throw new Error(err.message || "Failed to register");
    }
}
