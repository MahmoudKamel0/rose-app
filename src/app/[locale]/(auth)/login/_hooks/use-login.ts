"use client";

import { LoginValues } from "@lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export const useLogin = () => {

    const router = useRouter();

    const { isPending, error, mutate } = useMutation({
        mutationFn: async (values: LoginValues) => {
        const response = await signIn("credentials", {
            ...values,
            redirect: false,
        });

        if(response?.error) {
            throw new Error(response.error);
        }

        if (response?.url) {
                router.push(response.url);
            } else {
                router.push("/overview");
            }
        },
    });

    return { isPending, error, login: mutate }
};