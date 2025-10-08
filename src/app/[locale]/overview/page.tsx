import { Suspense } from "react";
import TestimonialsSection from "@components/features/testimonials/testimonials-section";
import AboutSection from "@components/layout/about-section/about-section";
import CompaniesSection from "@components/layout/campanies-section/campanies-section";
import GallerySection from "@components/layout/gallary-section/gallery-section";
import ToggleLocale from "@components/layout/header/toggle-locale";
import { cn } from "@lib/utils/cn.utils";
import { useTranslations } from "next-intl";

export default function HomePage() {
    const t = useTranslations();

    return (
        <>
            <p>{t("hello-world")}</p>
            <ToggleLocale />
            <TestimonialsSection />
            <div className={cn("mx-auto flex w-[1281px] flex-col gap-32 py-20")}>
                <AboutSection />
                <GallerySection />
                <CompaniesSection />
            </div>
        </>
    );
}
