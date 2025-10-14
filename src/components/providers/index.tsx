import { ModeToggle } from "@components/ui/mode-toggle";
import NextIntlClientProvider from "./nextIntl-client/components/nextIntl-client.provider";
import ReactQueryProvider from "./react-query.provider";
import { ThemeProvider } from "./theme.provider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <NextIntlClientProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <Toaster />
                    {/* <ModeToggle /> */}
                </ThemeProvider>
            </NextIntlClientProvider>
        </ReactQueryProvider>
    );
}
