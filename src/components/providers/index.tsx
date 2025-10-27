import { ThemeProvider } from "./components/theme.provider";
import { Toaster } from "@components/ui/sonner";
import { ReactNode } from "react";
import NextIntlClientProvider from "./nextIntl-client/components/nextIntl-client.provider";
import NextAuthProvider from "./components/next-auth.provider";
import ReactQueryProvider from "./components/react-query.provider";
import DevtoolModeToggle from "@components/shared/devtool-modeToggle";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <NextIntlClientProvider>
            <ReactQueryProvider>
                <NextAuthProvider>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        <Toaster position="bottom-right" richColors />
                        {children}
                        <DevtoolModeToggle />
                    </ThemeProvider>
                </NextAuthProvider>
            </ReactQueryProvider>
        </NextIntlClientProvider>
    );
}
