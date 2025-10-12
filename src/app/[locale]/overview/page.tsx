import AboutSection from "@components/features/about-section/about-section";
import CompaniesSection from "@components/features/companies-section/companies-section";
import GallerySection from "@components/features/gallary-section/gallery-section";
import TestimonialsSection from "@components/features/testimonials/testimonials-section";
import ToggleLocale from "@components/layout/header/toggle-locale";

import { useTranslations } from "next-intl";

export default function Page() {
    const t = useTranslations();
    return (
        <>
            <p>{t("hello-world")}</p>
            <ToggleLocale />
            <TestimonialsSection />
            <div className="mx-auto flex w-[1281px] flex-col gap-32 py-20">
                <AboutSection />
                <GallerySection />
                <CompaniesSection />
            </div>
        </>
    );
}
