"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Subscription Component
 *
 * Renders a newsletter subscription form in the footer,
 * using translations from next-intl.
 */
export default function Subscription() {
    const t = useTranslations("footer.subscription");

    return (
        <div className="w-96">
            {/* Header */}
            <h4 className="text-xl font-semibold text-softpink-300">
                {t("title").split(t("highlight"))[0]}
                <span className="text-white">{t("highlight")}</span>
                {t("title").split(t("highlight"))[1]}
            </h4>
            <p className="mb-5 text-zinc-500">{t("description")}</p>

            {/* Form subscription email */}
            <form className="relative h-10 w-full overflow-hidden rounded-full">
                <Input
                    type="email"
                    className="h-10 w-full border-0 bg-zinc-600 text-zinc-50 placeholder:text-zinc-400"
                    placeholder={t("input-placeholder")}
                />
                <Button className="absolute right-0 top-0 !flex h-full w-28 items-center rounded-full bg-maroon-50 text-maroon-700 hover:bg-maroon-100 [&_svg]:stroke-maroon-700">
                    {t("button")} <ArrowRight />
                </Button>
            </form>
        </div>
    );
}
