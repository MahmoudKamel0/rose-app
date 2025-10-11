import AboutImages from "./components/about-images";
import AboutContent from "./components/about-content";

export default function AboutSection() {
    return (
        <section className="flex min-h-[399px] gap-20">
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
