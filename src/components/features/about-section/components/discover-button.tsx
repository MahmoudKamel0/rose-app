import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DiscoverButton() {
    return (
        <Button className="dark:hover:bg-[#D75458]flex mt-6 h-9 w-[121px] items-center justify-center gap-1 rounded-md bg-[#A6252A] text-white transition-colors hover:bg-[#8E1F24] dark:bg-[#FFC2D0] dark:text-zinc-800">
            Discover
            {/* <ArrowRight size={16} className={cn("stroke-white dark:stroke-black")} /> */}
        </Button>
    );
}
