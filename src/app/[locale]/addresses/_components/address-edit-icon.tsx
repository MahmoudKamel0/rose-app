import { Button } from "@components/ui/button";
import { AddressStepProps } from "@lib/types/end-point-api/addresses";
import { PenLine } from "lucide-react";
import React from "react";

function AddressEditIcon({ setStep }: AddressStepProps) {
    return (
        <Button
            type="button"
            variant={"ghost"}
            size={"rounded-icon"}
            className="rounded-full border-1 border-zinc-400 bg-white dark:hover:bg-zinc-200"
            onClick={() => setStep("edit_address")}
        >
            <PenLine size={18} className="text-zinc-700" />
        </Button>
    );
}

export default AddressEditIcon;
