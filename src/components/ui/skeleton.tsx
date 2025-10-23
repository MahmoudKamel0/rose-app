import { cn } from "@/lib/utils/cn.util";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("bg-zinc-300 w-full animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };
