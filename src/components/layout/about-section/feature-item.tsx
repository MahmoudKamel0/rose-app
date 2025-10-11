import { cn } from "@lib/utils/cn.utils";
import { Check } from "lucide-react";

type FeatureItemProps = {
    title: string;
};
export default function FeatureItem({ title }: FeatureItemProps) {
    return (
        <div className={cn("flex items-center gap-5")}>
            <Check className={cn("stroke-[#741C21] text-sm dark:stroke-[#FF85A2]")} />
            <span className={cn("text-zinc-800 dark:text-zinc-50")}>{title}</span>
        </div>
    );
}
