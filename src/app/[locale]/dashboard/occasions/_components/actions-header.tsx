"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ActionsHeader() {
    // Hooks
    const router = useRouter();
    const t = useTranslations("Occasions");

    return (
        <div className="flex items-center justify-between">
            {/* Header */}
            <h2 className="text-xl font-semibold">{t("title")}</h2>

            {/* Add Occasion Button */}
            <Button
                variant="default"
                className="w-fit text-[1rem] font-medium text-white"
                onClick={() => router.push("/dashboard/occasions/create")}
            >
                <Plus className="h-5 w-5 text-white" />
                {t("add")}
            </Button>
        </div>
    );
}
