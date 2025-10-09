import { Loader2Icon } from "lucide-react";

import { cn } from "@lib/utils/cn.utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin stroke-white", className)} {...props} />;
}

export { Spinner };
