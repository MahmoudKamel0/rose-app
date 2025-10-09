import { cn } from "@lib/utils/cn.utils";
import { ReactNode } from "react";

/**
 * @component Container
 *
 * A reusable layout wrapper component that centers its content horizontally
 * using Tailwind's `container` and `mx-auto` utility classes.
 *
 * @param children as `ReactNode` The content to be rendered inside the container.
 */
export function Container({ children, className }: { children?: ReactNode; className: string }) {
    return <div className={cn("container mx-auto", className)}>{children}</div>;
}
