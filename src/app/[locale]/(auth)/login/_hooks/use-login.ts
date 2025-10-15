"use client";

import { LoginValues } from "@lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";


export const useLogin = () => {

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (values: LoginValues) => {
        const response = await signIn("credentials", {
            ...values,
            redirect: false,
        });

        if(response?.error) {
            throw new Error(response.error);
        }
        const callbackUrl = response?.url || "/overview"
        window.location.href = `${window.location.origin}${callbackUrl}`;

        },
    });

    return { isPending, error, login: mutate }
};