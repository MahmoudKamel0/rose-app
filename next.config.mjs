import createNextIntlPlugin from "next-intl/plugin";
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow images from (flower.elevateegy.com) domain
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
    // Handle multiple path redirects
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

