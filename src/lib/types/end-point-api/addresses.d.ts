import { ADDRESS_STEPS, Edit_ADDRESS_STEPS, NEW_ADDRESS_STEPS } from "@lib/constants/address-steps.constant";

type Addresses = {
    street: string;
    phone: string;
    city: string;
    lat: string;
    long: string;
    username: string;
    _id: string;
};

declare type AddressesResponse = {
    addresses: Addresses[] | [];
};

export type AddressStepProps = {
    // Use the exported `AddressSteps` union type so the setter has the correct state action type
    setStep: React.Dispatch<React.SetStateAction<AddressSteps>>;
};
export type NewAddressStepProps = {
    setNewAddressStep: React.Dispatch<React.SetStateAction<NewAddressSteps>>;
    // optional: current new address data and setter to persist between steps
    newAddressData: Partial<{
        city: string;
        street: string;
        phone: string;
        lat: string;
        long: string;
        username: string;
    }>;
    setNewAddressData?: React.Dispatch<
        React.SetStateAction<
            Partial<{
                city: string;
                street: string;
                phone: string;
                lat: string;
                long: string;
                username: string;
            }>
        >
    >;
};

export type AddressReq = {
    street: string;
    phone: string;
    city: string;
    lat: string;
    long: string;
    username: string;
};

export type AddressSteps = (typeof ADDRESS_STEPS)[keyof typeof ADDRESS_STEPS];
export type NewAddressSteps = (typeof NEW_ADDRESS_STEPS)[keyof typeof NEW_ADDRESS_STEPS];
export type EditAddressSteps = (typeof Edit_ADDRESS_STEPS)[keyof typeof Edit_ADDRESS_STEPS];
