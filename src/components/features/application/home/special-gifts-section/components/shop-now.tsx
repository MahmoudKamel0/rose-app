import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * ShopNowSection Component
 *
 * Renders a promotional card that encourages users to shop special gifts.
 * Displays a background image, a highlighted badge for starting price,
 * a headline, and a call-to-action button.
 * Typically used in the home page "Special Gifts" section as a prominent entry point
 * to themed offers or product listings.
 */
export default function ShopNowSection() {
    return (
        <div
            className="h-441 flex w-72 flex-col justify-end overflow-hidden rounded-lg px-6 py-9"
            style={{ background: "url(/images/leftCard.webp) center/cover" }}
        >
            <Badge variant="secondary">Staring from 10.99 EGP</Badge>
            <h2 className="mb-9 mt-2 text-2xl font-semibold text-white">Special Gifts For The People You Love</h2>
            <Button variant="secondary">
                Shop Now <ArrowRight size="16" />
            </Button>
        </div>
    );
}
