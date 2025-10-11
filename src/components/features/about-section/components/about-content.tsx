import Subtitle from "@components/shared/subtitle";
import DiscoverButton from "./discover-button";
import AboutFeatures from "./about-features";

export default function AboutContent() {
    return (
        <div className="flex-1">
            {/* About Heading */}
            <div className="about-heading mt-5 flex flex-col gap-6 pt-0.5">
                <Subtitle text="about" />

                <h2 className="text-3xl font-bold text-[#741C21] capitalize dark:text-[#FFC2D0]">
                    delivering the <span className="text-[#FF668B] dark:text-[#D75458]">finest</span> gift boxes for your <br />{" "}
                    <span className="text-[#FF668B] dark:text-[#D75458]">special</span> moments
                </h2>
            </div>

            {/* About Description */}
            <div className="about-description">
                <p className="mt-2 leading-none tracking-[0em] text-zinc-500 dark:text-[#C4C4C4]">
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
