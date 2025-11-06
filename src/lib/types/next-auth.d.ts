declare module "next-auth" {
    interface User {
        accessToken: string;
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            gender: string;
            phone: string;
            photo: string;
            role: string;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            wishlist: any[];
            addresses: string;
            createdAt: string;
        };
    }
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User["user"];
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: User["user"];
        accessToken: string;
    }
}
