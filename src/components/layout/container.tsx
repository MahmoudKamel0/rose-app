import { ContainerProps } from "@lib/types/components";
import { cn } from "@lib/utils/cn.util";

/**
 * @component Container
 *
 * A reusable layout wrapper component that centers its content horizontally
 * using Tailwind's `container` and `mx-auto` utility classes.
 *
 * @param children as `ReactNode` The content to be rendered inside the container.
 */
export function Container({ children, className }: ContainerProps) {
    return <div className={cn("container mx-auto w-[1279px]", className)}>{children}</div>;
}
