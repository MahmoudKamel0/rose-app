import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

function PageLoader() {
    const t = useTranslations("product-details");

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
            <Loader2 className="text-maroon-500 animate-spin" size={56} />
            <p>{t("loading")}</p>
        </div>
    );
}

export default PageLoader;
