import ListLinks from "./components/list-links";
import LogoCopyright from "./components/logo-copyright";
import Subscription from "./components/subscription";
import { Container } from "@components/layout/container";

/**
 * Footer Component
 *
 * A comprehensive footer component for the Rose E-Commerce application that includes:
 * - Company branding with logo and copyright information
 * - Navigation links for website discovery
 * - Newsletter subscription form with discount offer
 */
export default function Footer() {
    return (
        <footer className="h-96 bg-zinc-800 py-10 mt-44" id="footer">
            <Container className="flex justify-between gap-5">
                {/* Logo & Copy right */}
                <LogoCopyright />

                {/* Links */}
                <ListLinks />

                {/* Subscription */}
                <Subscription />
            </Container>
        </footer>
    );
}
