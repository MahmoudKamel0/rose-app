import { Alert, AlertTitle } from "@components/ui/alert";
import { cn } from "@lib/utils/cn.util";
import { Check, X } from "lucide-react";

/**
 * SuccessfulAlert
 *
 * Displays a fixed-position alert in the bottom-right corner of the screen
 * to indicate a successful operation. The alert includes:
 *  - A checkmark icon to visually represent success.
 *  - A success message ("Successful operation").
 *  - A close button (X icon) for dismissing the alert (does not have a handler in this version).
 *
 * Styling:
 *  - Uses green background and border to reinforce the "success" status.
 *  - Supports dark mode with adjusted colors.
 *
 * Usage:
 *  - Place this component after a successful user action, e.g. form submission.
 *  - Add logic to control visibility and functionality as needed.
 */

export default function SuccessfulAlert() {
    const ALERT_STYLE = cn(
        "fixed right-5 bottom-5 w-md border border-emerald-700 bg-emerald-50",
        "dark:border-zinc-800 dark:bg-emerald-300"
    );

    return (
        <Alert className={ALERT_STYLE}>
            <AlertTitle className={cn("mb-0 flex items-center gap-2.5 text-sm font-semibold")}>
                <Check /> Successful operation
                <button className={cn("absolute top-2.5 right-2.5")}>
                    <X size="15" className={cn("fill-zinc-400")} />
                </button>
            </AlertTitle>
        </Alert>
    );
}
