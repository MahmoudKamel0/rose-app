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
    // For test display location user

    return (
        <div aria-label="deliver to location" aria-labelledby="location">
            {/* Label for delivery location */}
            <span className={cn("text-sm dark:text-zinc-500")}>Deliver to:</span>

            {/* City name and icon */}
            <p
                id="location"
                className={cn(
                    "text-maroon-700 dark:text-softpink-200 flex gap-1.5 font-medium",
                    "[&_svg]:stroke-maroon-700 dark:[&_svg]:stroke-softpink-200"
                )}
            >
                <MapPinPen size="20" /> {address}
            </p>
        </div>
    );
}
