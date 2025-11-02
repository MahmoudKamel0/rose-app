"use client";

import { LoginFields } from "@lib/schemas/auth/login.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const useLogin = () => {
    // Initialize Next.js navigation hooks
    const router = useRouter();
    const searchParams = useSearchParams();

    // Define a mutation using React Query for handling the login process
    const { isPending, error, mutate } = useMutation({
        // The main function that runs when the mutation is triggered
        mutationFn: async (values: LoginFields) => {
            // Get callback URL from query params (default to homepage if not provided)
            const callbackUrl = searchParams.get("callbackUrl") || "/";

            // Attempt to sign in using NextAuth credentials provider
            const response = await signIn("credentials", {
                ...values,
                redirect: false,
            });

            if (response?.error) {
                throw new Error(response.error);
            }

            // On successful login, navigate to the callback URL or home page
            router.replace(callbackUrl);
        },
    });

    // Return mutation state
    return { isPending, error, login: mutate };
};

// Export the custom hook to be used in login component
export { useLogin };