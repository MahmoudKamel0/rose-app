import { addUserAddress } from "../_actions/add-user-address.action";
import { DeleteUserAddress } from "../_actions/delete-user-address.action";
import { updateUserAddress } from "../_actions/update-user-address.action";
import { AddressesResponse, AddressReq } from "@lib/types/end-point-api/addresses";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useAddresses() {
    const session = useSession();

    const {
        error,
        isPending,
        data: addressesData,
    } = useQuery<AddressesResponse["addresses"]>({
        queryKey: ["addresses"],
        queryFn: async () => {
            const res = await fetch(`/api/get-addresses-user`);

            const response = await res.json();

            return response;
        },
        enabled: !!session.data, // don’t run until we have an Session (Token)
    });

    return {
        isPending,
        addressesData,
        error,
    };
}

export function useDeleteUserAddress() {
    const { mutateAsync, error, isPending, isSuccess, isError } = useMutation({
        mutationFn: async (addressId: string) => {
            const res = await DeleteUserAddress(addressId);

            if (!res) {
                throw new Error("No response from server");
            }

            if ("error" in res && res.error) {
                throw new Error(res.error);
            }

            return res;
        },
    });

    return { mutateAsync, error, isPending, isSuccess, isError };
}

export function useAddUserAddress() {
    const { mutateAsync, error, isPending, isSuccess, isError } = useMutation({
        // Accept partial address payloads (client may not have username/_id)
        mutationFn: async (address: AddressReq) => {
            const res = await addUserAddress(address);

            if (!res) {
                throw new Error("No response from server");
            }

            if ("error" in res && res.error) {
                throw new Error("Something went wrong please try again");
            }

            return res;
        },
    });

    return { mutateAsync, error, isPending, isSuccess, isError };
}

export function useEditUserAddress() {
    const {
        mutateAsync: addUserAddress,
        error,
        isPending,
        isSuccess,
        isError,
    } = useMutation({
        mutationFn: async ({ address, address_id }: { address: AddressReq; address_id: string }) => {
            const res = await updateUserAddress({ address, address_id });

            if (!res) {
                throw new Error("No response from server");
            }

            if ("error" in res && res.error) {
                throw new Error("Something went wrong please try again");
            }

            return res;
        },
    });

    return { mutateAsync: addUserAddress, error, isPending, isSuccess, isError };
}
