import { JSON_HEADER } from "@lib/constants/shared.constant";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    // Customize NextAuth pages
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            // Authorize function validates user credentials
            authorize: async (credentials) => {
                // Call login API
                const response = await fetch(`${process.env.BASE_URL}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: {
                        ...JSON_HEADER,
                    },
                });

                // Parse the API response
                const payload: ApiResponse<LoginResponse> = await response.json();

                if ("error" in payload) {
                    throw new Error(payload.error);
                }
                // Return user object to store in JWT
                return {
                    id: payload.user._id,
                    user: payload.user,
                    accessToken: payload.token,
                };
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.accessToken = user.accessToken;
                token.user = user.user;
            }
            return token;
        },
        session: ({ session, token }) => {
            session.user = token.user;

            return session;
        },
    },
};
