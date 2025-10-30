import NextIntlClientProvider from "./nextIntl-client/components/nextIntl-client.provider";
import ReactQueryProvider from "./components/react-query.provider";
import { ThemeProvider } from "./components/theme.provider";
import NextAuthProvider from "./components/next-auth.provider";
import { Toaster } from "@components/ui/sonner";
import { ModeToggle } from "@components/ui/mode-toggle";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                <NextIntlClientProvider>
                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        <Toaster position="bottom-right" richColors />
                        {children}
                        <ModeToggle />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </NextAuthProvider>
        </ReactQueryProvider>
    );
}
