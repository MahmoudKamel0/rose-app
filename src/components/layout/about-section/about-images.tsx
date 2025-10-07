import Image from "next/image";
import { cn } from "@lib/utils/cn.utils";
import MainImage from "./main-image";

// Reusable rounded styles
const secondaryRounded = "rounded-tl-[50px] rounded-tr-[100px] rounded-br-[100px] rounded-bl-[50px]";

export default function AboutImages() {
    return (
        <div className={cn("flex gap-2")}>
            {/* Right Main Image with Frame */}
            <MainImage />
            {/* Right Column Images */}
            <div className={cn("otherImages flex max-h-[345px] w-[193px] flex-col gap-2 px-2 py-4")}>
                <Image
                    src="/images/brown-gift-orange-confetti.webp"
                    alt="Gift 2"
                    width={193}
                    height={193}
                    className={cn("h-[193px] w-[193px] rounded-[150px] object-cover")}
                />
                <Image
                    src="/images/gift-card-with-balloons.webp"
                    alt="Gift 3"
                    width={193}
                    height={144}
                    className={cn(secondaryRounded, "h-[144px] w-[193px] object-cover")}
                />
            </div>
        </div>
    );
}
