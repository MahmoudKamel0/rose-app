import { Alert, AlertTitle } from "@components/ui/alert";
import { cn } from "@lib/utils/cn.utils";
import { Info, X } from "lucide-react";

/**
 * InformativeAlert
 *
 * A fixed-position alert component displayed in the bottom-right corner of the screen
 * to provide informational messages to the user. This alert includes:
 *  - An information icon for visual indication.
 *  - A default "Informative message" text (can be customized if needed).
 *  - A close (X) button for dismissing the alert (currently without functionality).
 *
 * Styling:
 *  - Uses a light-themed background and border by default.
 *  - Supports dark mode with adjusted background and border colors.
 *  - Visually stands out as a non-critical, informational notice.
 *
 * Usage:
 *  - Place this component to notify users about informational events.
 *  - Add logic as needed to customize message and handle close/dismiss actions.
 */

export default function InformativeAlert() {
    // Styles for the informative alert: fixed position at bottom-right, with light/dark backgrounds and borders
    const ALERT_STYLE = cn(
        "fixed right-5 bottom-5 w-md border border-zinc-400 bg-zinc-100", 
        "dark:border-zinc-800 dark:bg-zinc-300"
    );

    return (
        <Alert className={ALERT_STYLE}>
            <AlertTitle className={cn("mb-0 flex items-center gap-2.5 text-sm font-semibold")}>
                <Info />Informative message
                <button className={cn("absolute top-2.5 right-2.5")}>
                    <X size="15" className={cn("fill-zinc-400")} />
                </button>
            </AlertTitle>
        </Alert>
    );
}
