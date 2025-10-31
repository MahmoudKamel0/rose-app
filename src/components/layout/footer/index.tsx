import { Container } from "@components/layout/container";
import LogoCopyright from "./components/logo-copyright";
import ListLinks from "./components/list-links";
import Subscription from "./components/subscription";

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
        <footer className="mt-44 h-96 bg-zinc-800 py-10">
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
