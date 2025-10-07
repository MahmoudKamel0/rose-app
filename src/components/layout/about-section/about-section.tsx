import { cn } from "@lib/utils/cn.utils";
import AboutImages from "./about-images";
import AboutContent from "./about-content";

export default function AboutSection() {
    return (
        <section className={cn("flex min-h-[399px] gap-20")}>
            {/* Left: Images */}
            <div className={cn("w-[530.49px]")}>
                <AboutImages />
            </div>

            {/* Right: Text */}
            <div className={cn("flex-1")}>
                <AboutContent />
            </div>
        </section>
    );
}
