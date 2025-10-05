import { cn } from "@lib/utils/cn.utils";
import { Alert, AlertTitle } from "./alert.ui";
import { X } from "lucide-react";

export default function ErrorAlert() {
    return (
        <Alert
            className={cn(
                "fixed right-5 bottom-5 w-md border border-red-700 bg-red-50",
                "dark:border-zinc-800 dark:bg-red-300"
            )}
        >
            <AlertTitle className={cn("mb-0 flex items-center gap-2.5 text-sm font-semibold")}>
                <X />
                Unsuccessful operation
                <button className={cn("absolute top-2.5 right-2.5")}>
                    <X size="15" className={cn("fill-zinc-400")} />
                </button>
            </AlertTitle>
        </Alert>
    );
}
