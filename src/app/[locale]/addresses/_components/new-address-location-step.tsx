"use client";

import { useAddUserAddress, useEditUserAddress } from "../hooks/use-addresses.hook";
import { Button } from "@components/ui/button";
import { NewAddressStepProps, AddressSteps, AddressReq } from "@lib/types/end-point-api/addresses";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { toast } from "sonner";

const MapCard = dynamic(() => import("../_components/map"), { ssr: false });

type NewAddressLocationStepProps = NewAddressStepProps & {
    setStep: React.Dispatch<React.SetStateAction<AddressSteps>>;
    selectedAddressId?: string;
    mode: "new" | "edit";
};

export default function NewAddressLocationStep({
    setNewAddressStep,
    newAddressData,
    setNewAddressData,
    setStep,
    selectedAddressId,
    mode,
}: NewAddressLocationStepProps) {
    // Translations
    const t = useTranslations("address-step-2");
    // State
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>({ lat: 0, lng: 0 });
    const [locationError, setLocationError] = useState<string | null>(null);

    // Hooks
    const addMutation = useAddUserAddress();
    const editMutation = useEditUserAddress();
    const session = useSession();
    const queryClient = useQueryClient();

    // Functions
    const validateLocation = () => {
        const latNum: number | null = coords?.lat ?? (newAddressData?.lat ? Number(newAddressData.lat) : null);
        const longNum: number | null = coords?.lng ?? (newAddressData?.long ? Number(newAddressData.long) : null);

        if (latNum == null || longNum == null || latNum === 0 || longNum === 0) {
            setLocationError(t("loaction-error"));
            return null;
        }

        setLocationError(null);
        return { latNum, longNum };
    };

    const buildPayload = (latNum: number, longNum: number): AddressReq => {
        return {
            city: newAddressData?.city || "",
            street: newAddressData?.street || "",
            phone: newAddressData?.phone || "",
            lat: String(latNum),
            long: String(longNum),
            username: `${session.data?.user.firstName} ${session.data?.user.firstName}`,
        };
    };

    const handleMutationSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ["addresses"] });

        if (mode === "edit") {
            toast.success(t("updated-succ"));
        } else {
            toast.success(t("added-succ"));
        }
        setStep("user_addresses");
    };

    const executeMutation = async (payload: AddressReq) => {
        if (mode === "edit") {
            if (!selectedAddressId) throw new Error("selectedAddressId is required for edit mode");
            await editMutation.mutateAsync({ address: payload, address_id: selectedAddressId }, { onSuccess: handleMutationSuccess });
        } else {
            await addMutation.mutateAsync(payload, { onSuccess: handleMutationSuccess });
        }
    };

    //  Main handler function
    const handleClick = async () => {
        try {
            const validated = validateLocation();
            if (!validated) return;

            const payload = buildPayload(validated.latNum, validated.longNum);
            setNewAddressData?.({ ...newAddressData, lat: payload.lat, long: payload.long });

            await executeMutation(payload);
        } catch (err) {
            setLocationError(`Failed to save address. Please try again. ${err}`);
        }
    };

    // Variables
    const mutationError = mode === "edit" ? editMutation.error : addMutation.error;
    const isPending = mode === "edit" ? editMutation.isPending : addMutation.isPending;

    return (
        <div>
            <h2 className="mt-4 flex items-center gap-2 border-b-1 border-b-zinc-200 pb-2.5 text-2xl font-medium text-maroon-600 dark:text-softpink-200">
                <Button size={"rounded-icon"} onClick={() => setNewAddressStep("new_address_detailes_step")}>
                    <ArrowLeft className="rtl:rotate-180" />
                </Button>
                <span> {t("find")}</span>
            </h2>

            <MapCard
                initial={
                    coords ??
                    (newAddressData?.lat && newAddressData?.long
                        ? { lat: Number(newAddressData.lat), lng: Number(newAddressData.long) }
                        : undefined)
                }
                onChange={(c) => {
                    if (c.lat === 0 && c.lng === 0) setCoords(null);
                    else {
                        setCoords(c);
                        setLocationError(null);
                    }
                }}
            />

            {/* Handle location error */}
            {locationError && <p className="mt-2 text-sm text-red-500">{locationError}</p>}

            {/* Handle mutation error */}
            {mutationError && <p className="mt-2 text-sm text-red-500">{mutationError.message}</p>}

            <Button className="mt-9 w-full" onClick={handleClick} disabled={isPending}>
                {isPending ? t("adding") : t("add")}
            </Button>
        </div>
    );
}
