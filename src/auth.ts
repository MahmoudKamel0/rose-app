import { JSON_HEADER } from "@lib/constants/shared.constant";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    jwt: {
        encode: async ({ secret, token }) => {
            if (!token) return "";
            return jwt.sign(token, secret, { algorithm: "HS256" });
        },

        decode: async ({ secret, token }) => {
            if (!token) return null;
            try {
                const decoded = jwt.verify(token, secret);
                if (typeof decoded === "string") return null;
                return decoded as any;
            } catch (error) {
                console.error("JWT decode failed:", error);
                return null;
            }
        },
    },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
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

                const payload = await response.json();

                if ("error" in payload) {
                    throw new Error(payload.error);
                }

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

    secret: process.env.NEXTAUTH_SECRET,
};
