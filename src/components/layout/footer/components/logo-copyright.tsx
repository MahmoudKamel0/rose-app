import Image from "next/image";
import { Link } from "@i18n/navigation";

/**
 * LogoCopyright Component
 *
 * This component displays the company branding in the footer section,
 * including the logo, application name, and copyright notice.
 * - The logo is rendered as a clickable link that navigates to the homepage.
 * - Shows the application title in a styled heading.
 * - Provides a copyright message.
 *
 * Usage:
 * <LogoCopyright />
 */
export default function LogoCopyright() {
    return (
        <div className="text-center">
            {/* logo brand */}
            <Link href="/">
                <Image src="/images/logo.webp" alt="rose logo" loading="lazy" width="240" height="225" />
            </Link>

            {/* copy right */}
            <h4 className="text-softpink-300 text-lg font-semibold">Rose E-Commerce App</h4>
            <p className="text-sm text-zinc-50">All rights reserved | 2025</p>
        </div>
    );
}
