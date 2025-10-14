import { FOOTER_LINKS } from "@lib/constants/component-ui.constant";
import { Link } from "lucide-react";

/**
 * ListLinks Component
 *
 * Renders a list of navigation links to be displayed in the footer area.
 * - Includes a section header that invites users to explore the website.
 * - Maps through the FOOTER_LINKS constant to generate link items.
 *
 * Used in the Footer component to provide quick access to important sections like Home, Products, Categories, etc.
 */

export default function ListLinks() {
    return (
        <ul className="flex-auto">
            {/* Title links */}
            <li>
                <h4 className="text-softpink-300 text-lg font-semibold">Discover our website</h4>
            </li>

            {/* Links important */}
            {FOOTER_LINKS.map((item) => (
                <li key={item.name}>
                    <Link className="font-medium text-zinc-50" href={item.path}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
