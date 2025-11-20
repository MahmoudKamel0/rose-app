import { CartSyncProvider } from "./cart-sync-provider";
import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/react-query.provider";
import DevtoolModeToggle from "@components/shared/devtool-modeToggle";
import { Toaster } from "@components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <NextIntlClientProvider>
            <NextAuthProvider>
                <ReactQueryProvider>
                    <NextThemesProvider defaultTheme="system" enableSystem disableTransitionOnChange attribute="class">
                        <CartSyncProvider>
                            <Toaster position="bottom-right" richColors />
                            {children}
                            <DevtoolModeToggle />
                        </CartSyncProvider>
                    </NextThemesProvider>
                </ReactQueryProvider>
            </NextAuthProvider>
        </NextIntlClientProvider>
    );
}
