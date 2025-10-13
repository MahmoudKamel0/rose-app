import NextIntlClientProvider from "./nextIntl-client/components/nextIntl-client.provider";
import ReactQueryClientProvider from "./query-client-provider/components/query-client-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextIntlClientProvider>
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </NextIntlClientProvider>
    );
}
