import { Button } from "@components/ui/button";
import { AddressStepProps } from "@lib/types/end-point-api/addresses";
import { useTranslations } from "next-intl";
import React from "react";

function AddressesHeader({ setStep }: AddressStepProps) {
    // Translaion
    const t = useTranslations("addresses-header");
    return (
        <header className="mb-9 flex items-center justify-between border-b-1 pb-4">
            <h1 className="text-3xl font-bold capitalize text-zinc-800 dark:text-zinc-50">{t("header")}</h1>
            <Button variant={"secondary"} type="button" onClick={() => setStep("new_address")}>
                {t("add-address")}
            </Button>
        </header>
    );
}

export default AddressesHeader;
