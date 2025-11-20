"use client";

import { registerAction } from "../_action/register.action";
import { RegisterInput } from "@lib/schemas/auth/register.schema";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterInput) => {
            try {
                const res = await registerAction(data);

                if (!res || res.error || res.error === "Failed") {
                    throw new Error(res?.error || "Something went wrong");
                }

                return res;
            } catch (err: any) {
                console.error("Registration failed:", err);
                throw err;
            }
        },
    });
};
