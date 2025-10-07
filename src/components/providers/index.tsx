import NextIntlClientProvider from "./nextIntl-client/components/nextIntl-client.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
