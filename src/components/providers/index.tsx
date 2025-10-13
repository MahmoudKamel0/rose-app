import { ModeToggle } from "@components/ui/mode-toggle";
import NextIntlClientProvider from "./nextIntl-client/components/nextIntl-client.provider";
import ReactQueryProvider from "./react-query.provider";
import { ThemeProvider } from "./theme.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <NextIntlClientProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    {/* <ModeToggle /> */}
                </ThemeProvider>
            </NextIntlClientProvider>
        </ReactQueryProvider>
    );
}
