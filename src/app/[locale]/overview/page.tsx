import Features from "@components/features/features/Features";
import Headers from "@components/features/header/header";
import Occasions from "@components/features/occasions/occasions";
import AboutSection from "@components/features/about-section/about-section";
import CompaniesSection from "@components/features/companies-section/companies-section";
import GallerySection from "@components/features/gallary-section/gallery-section";
import TestimonialsSection from "@components/features/testimonials/testimonials-section";
import Header from "@components/layout/header";

import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <main className="">
                {/* Header */}
                <Header />
                {/* <Headers /> */}
                <div className="mx-auto flex w-7xl flex-col">
                    <Occasions />
                    <Features />
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
