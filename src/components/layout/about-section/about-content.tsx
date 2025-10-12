import Subtitle from "@components/shared/subtitle";
import { cn } from "@lib/utils/cn.utils";
import DiscoverButton from "./discover-button";
import AboutFeatures from "./about-features";

export default function AboutContent() {
    return (
        <div className={cn("flex-1")}>
            {/* About Heading */}
            <div className={cn("about-heading mt-5 flex flex-col gap-6 pt-0.5")}>
                <Subtitle text="about" />
                <h2 className={cn("text-3xl font-bold text-[#741C21] dark:text-[#FFC2D0]")}>
                    Delivering the <span className={cn("text-[#FF668B] dark:text-[#D75458]")}>Finest</span> Gift Boxes for Your <br />{" "}
                    <span className={cn("text-[#FF668B] dark:text-[#D75458]")}>Special</span> Moments
                </h2>
            </div>

            {/* About Description */}
            <div className="about-description">
                <p className={cn("mt-2 leading-none tracking-[0em] text-zinc-500 dark:text-[#C4C4C4]")}>
                    Make every moment memorable with our premium gift boxes. Carefully curated and <br /> beautifully packaged, each box is
                    filled with handpicked items designed to impress.
                    <br /> Whether it's for a birthday, wedding, or a simple “thank you,” our gift boxes are crafted to <br /> leave a
                    lasting impression — because thoughtful gifting starts here.
                </p>
            </div>

            {/* DiscoverButton  */}
            <DiscoverButton />

            {/* AboutFeatures  */}
            <AboutFeatures />
        </div>
    );
}
