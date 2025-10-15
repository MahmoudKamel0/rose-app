import { ModeToggle } from "@components/ui/mode-toggle";
import NextIntlClientProvider from "./nextIntl-client/components/nextIntl-client.provider";
import ReactQueryProvider from "./components/react-query.provider";
import { ThemeProvider } from "./components/theme.provider";
import NextAuthProvider from "./components/next-auth.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <NextAuthProvider>
                <NextIntlClientProvider>
                     <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                            {/* <ModeToggle /> */}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </NextAuthProvider>
        </ReactQueryProvider>
    );
}
