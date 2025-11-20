import AboutFeatures from "./about-features";
import BtnPrimary from "@components/shared/btn-primary";
import Subtitle from "@components/shared/subtitle";
import { useTranslations } from "next-intl";

export default function AboutContent() {
    const t = useTranslations("about-section");
    return (
        <div className="flex-1">
            {/* About Heading */}
            <div className="about-heading mt-5 flex flex-col gap-6 pt-0.5">
                <Subtitle text={t("subtitle")} />

                <h2 className="text-3xl font-bold capitalize text-[#741C21] dark:text-[#FFC2D0]">
                    {t("heading.part1")} <span className="text-[#FF668B] dark:text-[#D75458]"> {t("heading.highlight1")}</span>{" "}
                    {t("heading.part2")} <br /> <span className="text-[#FF668B] dark:text-[#D75458]"> {t("heading.highlight2")}</span>{" "}
                    {t("heading.part3")}
                </h2>
            </div>
            {/* About Description */}
            <div className="about-description">
                <p className="mt-2 leading-none tracking-[0em] text-zinc-500 dark:text-[#C4C4C4]">
                    <span dangerouslySetInnerHTML={{ __html: t("description") }} />
                </p>
            </div>
            {/* DiscoverButton  */}
            <div className="mt-9">
                <BtnPrimary text={t("button")} />
            </div>
             {/* AboutFeatures  */}
            <AboutFeatures />
        </div>
    );
}
