<<<<<<< HEAD
import { cn } from "@/lib/utils/cn.utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("bg-primary/10 animate-pulse rounded-md", className)} {...props} />;
=======
import { cn } from "@/lib/utils/cn.util";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("bg-zinc-300 w-full animate-pulse rounded-md", className)} {...props} />;
>>>>>>> 54f27d8f79cc709188ec8e853b50c3dea765fc67
}

export { Skeleton };
