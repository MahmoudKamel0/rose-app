"use client";

import React, { useState } from "react";
import AddressesHeader from "./addresses-header";
import AddressesContent from "./addresses-content";
import { ADDRESS_STEPS } from "@lib/constants/address-steps.constant";
import { AddressSteps } from "@lib/types/end-point-api/addresses";
import NewAddress from "../new-address";
import EditAddress from "../edit-address";
import { useAddresses } from "../../hooks/use-addresses.hook";
import PageLoader from "@components/shared/page-loader";
import { AuthError } from "@app/[locale]/(auth)/_components/auth-error";

function AddressesDetailes() {
    // Uses state
    const [step, setStep] = useState<AddressSteps>(ADDRESS_STEPS.USER_ADDRESSES);
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");

    // Hooks
    const { isPending, error } = useAddresses();

    // Variables
    const steps = {
        [ADDRESS_STEPS.USER_ADDRESSES]: (
            <>
                <AddressesHeader setStep={setStep} />
                <AddressesContent setStep={setStep} setSelectedAddressId={setSelectedAddressId} />
            </>
        ),
        [ADDRESS_STEPS.NEW_ADDRESS]: <NewAddress setStep={setStep} />,
        [ADDRESS_STEPS.EDIT_ADDRESS]: <EditAddress setStep={setStep} selectedAddressId={selectedAddressId} />,
    };
    return (
        <div>
            {isPending && <PageLoader />}
            {error && <AuthError error={error.message} />}
            {steps[step]}
        </div>
    );
}

export default AddressesDetailes;
