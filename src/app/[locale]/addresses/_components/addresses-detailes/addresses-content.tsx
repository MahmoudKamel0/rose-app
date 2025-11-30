"use client";

import React from "react";
import AddressesField from "../addresses-fiels";
import { AddressesResponse, AddressStepProps } from "@lib/types/end-point-api/addresses";
import { useQueryClient } from "@tanstack/react-query";
import { ADDRESS_STEPS } from "@lib/constants/address-steps.constant";
import { Frown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AddressesContent({
    setStep,
    setSelectedAddressId,
}: AddressStepProps & { setSelectedAddressId: (id: string) => void }) {
    // Translation
    const t = useTranslations("addresses-content");

    // Hooks
    const queryClient = useQueryClient();
    const addressesData: AddressesResponse["addresses"] = queryClient.getQueryData(["addresses"]) || [];

    return (
        <section>
            {/* Addresses */}
            {addressesData.length < 1 && (
                <div className="flex flex-col items-center justify-center text-zinc-900 dark:text-zinc-50">
                    <Frown size={300} className="" />
                    <h2 className="text-6xl">{t("empty")}</h2>
                </div>
            )}
            <div className="flex flex-1 flex-col items-center justify-center gap-y-9">
                {!addressesData?.error &&
                    addressesData?.map((address) => (
                        <AddressesField
                            key={address._id}
                            title={address.city}
                            phone={address.phone}
                            street={address.street}
                            id={address._id}
                            setStep={setStep}
                            onEdit={() => {
                                setSelectedAddressId(address._id);
                                setStep(ADDRESS_STEPS["EDIT_ADDRESS"]);
                            }}
                        />
                    ))}
            </div>
        </section>
    );
}
