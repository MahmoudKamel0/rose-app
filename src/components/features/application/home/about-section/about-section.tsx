import AboutContent from "./components/about-content";
import AboutImages from "./components/about-images";

export default function AboutSection() {
    return (
        <section className="flex min-h-[399px] gap-20 mt-32 py-2.5" id="about">
            {/* Left: Images */}
            <div className="w-[530.49px]">
                <AboutImages />
            </div>

            {/* Right: Text */}
            <div className="flex-1">
                <AboutContent />
            </div>
        </section>
    );
}
