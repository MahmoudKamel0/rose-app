import { cn } from "@lib/utils/cn.util";
import { MapPinPen } from "lucide-react";
import React from "react";

/**
 * DeliverToClient component displays the current delivery location in the header.
 *
 * This component renders a section with a location icon and the name of the city ("Cairo")
 * where delivery is currently set. Useful for providing users with clear information on
 * where their orders will be delivered. Styled with theme-based colors.
 *
 * (Required): must is user authenticated
 */

export default function DeliverToClient({ address }: { address: string }) {
    // no use [FIRST_ADDRESS] = address, why? because missing typescript
    const FIRST_ADDRESS = address[0];

    return (
        <div className={cn("deliver")} aria-label="deliver to location" aria-labelledby="location">
            {/* Label for delivery location */}
            <span className={cn("text-sm dark:text-zinc-500")}>Deliver to:</span>

            {/* City name and icon */}
            <p
                id="location"
                className="flex gap-1.5 text-nowrap font-medium capitalize text-maroon-700 dark:text-softpink-200 [&_svg]:stroke-maroon-700 dark:[&_svg]:stroke-softpink-200"
            >
                <MapPinPen size="20" /> {FIRST_ADDRESS ?? "not location"}
            </p>
        </div>
    );
}
