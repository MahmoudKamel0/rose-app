import AboutSection from "@components/features/about-section/about-section";
import CompaniesSection from "@components/features/companies-section/companies-section";

import GallerySection from "@components/features/gallary-section/gallery-section";

export default function HomePage() {
    return (
        <div className="mx-auto flex w-[1281px] flex-col gap-32 py-20">
            <AboutSection />
            <GallerySection />
            <CompaniesSection />
        </div>
    );
}
