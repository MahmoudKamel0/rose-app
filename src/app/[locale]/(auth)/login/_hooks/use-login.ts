"use client";

import { LoginFields } from "@lib/schemas/auth/login.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useLogin = () => {
    const router = useRouter();

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (values: LoginFields) => {
            const response = await signIn("credentials", {
                ...values,
                redirect: false,
            });

            if (response?.error) {
                throw new Error(response.error);
            }

            if (response?.url) {
                router.push(response.url);
            } else {
                router.push("/product-reviews");
            }
        },
    });

    return { isPending, error, login: mutate };
};

// Custom hook for login mutation
export { useLogin };
