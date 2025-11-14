"use client";
import { NEW_ADDRESS_STEPS } from "@lib/constants/address-steps.constant";
import { AddressStepProps, NewAddressStepProps, NewAddressSteps } from "@lib/types/end-point-api/addresses";
import React, { useState } from "react";
import NewAddressDetailesStep from "./new-address-detailes-step";
import NewAddressLocationStep from "./new-address-location-step";
import { useTranslations } from "next-intl";

export default function NewAddress({ setStep }: AddressStepProps) {
    // Translations
    const t = useTranslations("address-step-1");

    // Use states
    const [newAddressStep, setNewAddressStep] = useState<NewAddressSteps>(NEW_ADDRESS_STEPS.NEW_ADDRESS_DETAILES_STEP);

    // persist form data between steps
    const [newAddressData, setNewAddressData] = useState<NewAddressStepProps["newAddressData"]>({
        city: "",
        street: "",
        phone: "",
        lat: undefined,
        long: undefined,
        username: "",
    });

    // Variables
    const NewAddresSteps = {
        [NEW_ADDRESS_STEPS.NEW_ADDRESS_DETAILES_STEP]: (
            <NewAddressDetailesStep
                setNewAddressStep={setNewAddressStep}
                newAddressData={newAddressData}
                setNewAddressData={setNewAddressData}
            />
        ),
        [NEW_ADDRESS_STEPS.NEW_ADDRESS_LOACTION_STEP]: (
            <NewAddressLocationStep
                setNewAddressStep={setNewAddressStep}
                newAddressData={newAddressData}
                setNewAddressData={setNewAddressData}
                setStep={setStep}
                mode="new"
            />
        ),
    };

    return (
        <>
            <section>
                <header className="mb-4 flex flex-col gap-8">
                    <h1 className="w-full text-3xl font-bold capitalize text-zinc-800 dark:text-zinc-50">{t("new")}</h1>
                    <div>line</div>
                </header>
                {NewAddresSteps[newAddressStep]}
            </section>
        </>
    );
}
