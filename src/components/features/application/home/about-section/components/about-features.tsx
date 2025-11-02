import { useTranslations } from "next-intl";
import FeatureItem from "./feature-item";

export default function AboutFeatures() {
    const t = useTranslations("about-section");

    const FEATURES = [t("features.competitive"), t("features.premium"), t("features.occasion"), t("features.delivery")];

    return (
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((feature) => (
                <FeatureItem key={feature} title={feature} />
            ))}
        </div>
    );
}
