import { Button } from "@components/ui/button";
import React from "react";

function AddressesHeader() {
    return (
        <header className="mb-9 flex items-center justify-between border-b-1 pb-4">
            <h1 className="text-3xl font-bold capitalize text-zinc-800 dark:text-zinc-50">my addresses</h1>
            <Button variant={"secondary"} type="button">
                Add a New Address
            </Button>
        </header>
    );
}

export default AddressesHeader;
