import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
    // rmote images source
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "flower.elevateegy.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    async redirects() {

        return [
            {
                source: "/",
                destination: "/overview",
                permanent: true,
            },
        ];

    },
};

// ===== Apply next-intl plugin =====
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
