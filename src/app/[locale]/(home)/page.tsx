import Features from "@components/features/features/Features";
import Occasions from "@components/features/occasions/occasions";
import AboutSection from "@components/features/about-section/about-section";
import CompaniesSection from "@components/features/companies-section/companies-section";
import GallerySection from "@components/features/gallary-section/gallery-section";
import TestimonialsSection from "@components/features/testimonials/testimonials-section";

import MostPopularSection from "@components/features/most-popular-section/most-popular";
import { useTranslations } from "next-intl";
import BestSelling from "@components/features/best-selling-section/best-selling-section";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <main className="">
                {/* Header */}
                {/* <Header /> */}
                {/* <Headers /> */}
                <div className="mx-auto flex w-7xl flex-col">
                    <Occasions />
                    <Features />
                    <BestSelling />
                    <MostPopularSection />
                    <AboutSection />
                    <GallerySection />
                </div>
                <TestimonialsSection />
                <div className="mx-auto flex w-7xl flex-col">
                    <CompaniesSection />
                </div>
            </main>

            {/* <ToggleLocale /> */}
        </>
    );
}
