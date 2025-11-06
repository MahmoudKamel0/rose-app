"use client";
import { NEW_ADDRESS_STEPS } from "@lib/constants/address-steps.constant";
import { AddressesResponse, AddressStepProps, EditAddressSteps } from "@lib/types/end-point-api/addresses";
import React, { useState } from "react";
import NewAddressDetailesStep from "./new-address-detailes-step";
import NewAddressLocationStep from "./new-address-location-step";
import { useQueryClient } from "@tanstack/react-query";
import { StepProgress } from "./step-progress";
import { useTranslations } from "next-intl";

export default function EditAddress({ setStep, selectedAddressId }: AddressStepProps & { selectedAddressId: string }) {
    // Translations
    const t = useTranslations("address-step-1");

    // Use states
    const [editAddressStep, setEditAddressStep] = useState<EditAddressSteps>("new_address_detailes_step");

    //Hooks
    const queryClient = useQueryClient();
    const addressesData = queryClient.getQueryData<AddressesResponse["addresses"]>(["addresses"]);

    //  Get the address for that ID from cache (no fetching)

    const selectedAddress = addressesData?.find((a) => a._id === selectedAddressId);

    // Use state
    const [newAddressData, setNewAddressData] = useState<
        Partial<{ city: string; street: string; phone: string; lat: string; long: string }>
    >({
        city: selectedAddress?.city || "",
        street: selectedAddress?.street || "",
        phone: selectedAddress?.phone || "",
        lat: selectedAddress?.lat || undefined,
        long: selectedAddress?.long || undefined,
    });

    // Variables
    const NewAddresSteps = {
        [NEW_ADDRESS_STEPS.NEW_ADDRESS_DETAILES_STEP]: (
            <NewAddressDetailesStep
                setNewAddressStep={setEditAddressStep}
                newAddressData={newAddressData}
                setNewAddressData={setNewAddressData}
            />
        ),
        [NEW_ADDRESS_STEPS.NEW_ADDRESS_LOACTION_STEP]: (
            <NewAddressLocationStep
                setNewAddressStep={setEditAddressStep}
                newAddressData={newAddressData}
                setNewAddressData={setNewAddressData}
                setStep={setStep}
                selectedAddressId={selectedAddressId}
                mode="edit"
            />
        ),
    };

    return (
        <>
            <section>
                <header className="mb-4 flex flex-col gap-8">
                    <h1 className="w-full text-3xl font-bold capitalize text-zinc-800 dark:text-zinc-50">{t("edit")}</h1>
                    <StepProgress currentStep={editAddressStep === "new_address_detailes_step" ? 1 : 2} />
                </header>
                {NewAddresSteps[editAddressStep]}
            </section>
        </>
    );
}
