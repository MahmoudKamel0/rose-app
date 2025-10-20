"use client";

import { useMutation } from "@tanstack/react-query";
import { RegisterInput } from "@lib/schemas/auth.schema";
import { registerAction } from "../_action/register.action";

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
