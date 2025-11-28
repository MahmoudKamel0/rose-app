"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionsHeader() {
    const router = useRouter();

    return (
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Occasions</h2>

            <Button variant="default" className="w-fit text-[1rem] font-medium text-white" onClick={() => router.push("/occasions/create")}>
                <Plus className="h-5 w-5 text-white" />
                Add a new occasion
            </Button>
        </div>
    );
}
