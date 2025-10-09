import { Alert, AlertTitle } from "@components/ui/alert";
import { cn } from "@lib/utils/cn.utils";
import { Check, X } from "lucide-react";

export default function SuccessfulAlert() {
    return (
        <Alert
            className={cn(
                "fixed right-5 bottom-5 w-md border border-emerald-700 bg-emerald-50",
                "dark:border-zinc-800 dark:bg-emerald-300"
            )}
        >
            <AlertTitle className={cn("mb-0 flex items-center gap-2.5 text-sm font-semibold")}>
                <Check />
                Successful operation
                <button className={cn("absolute top-2.5 right-2.5")}>
                    <X size="15" className={cn("fill-zinc-400")} />
                </button>
            </AlertTitle>
        </Alert>
    );
}
