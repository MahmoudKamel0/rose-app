import { Button } from "@components/ui/button";
import { cn } from "@lib/utils/cn.utils";
import { ArrowRight } from "lucide-react";

export default function DiscoverButton() {
    return (
        <Button
            className={cn(
                "mt-6 h-9 w-[121px] rounded-md bg-[#A6252A] text-white transition-colors hover:bg-[#8E1F24] dark:bg-[#FFC2D0] dark:text-zinc-800 dark:hover:bg-[#D75458]",
                "flex items-center justify-center gap-1"
            )}
        >
            Discover
            {/* <ArrowRight size={16} className={cn("stroke-white dark:stroke-black")} /> */}
        </Button>
    );
}
