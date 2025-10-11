import { cn } from "@lib/utils/cn.utils";
import Image from "next/image";

export default function MainImage() {
    return (
        <div
            className={cn(
                "relative h-[370px] w-[329.49px]",
                // Pseudo-element as border/frame
                "before:absolute before:top-0 before:left-0 before:content-['']",
                "before:h-[363px] before:w-72 before:border-4 before:border-[#A6252A]",
                "dark:before:border-[#FF668B]",
                // Custom rounded corners on pseudo-element
                "before:rounded-tl-[50px] before:rounded-tr-[120px] before:rounded-br-[120px] before:rounded-bl-[120px]"
            )}
        >
            <Image
                src="/images/hand-holding-purple-ribbon.webp"
                alt="Purple gift"
                width={302}
                height={344}
                className="absolute top-6 left-7 z-10 h-[344px] w-[302px] rounded-tl-[50px] rounded-tr-[120px] rounded-br-[120px] rounded-bl-[120px] object-cover"
            />
        </div>
    );
}
