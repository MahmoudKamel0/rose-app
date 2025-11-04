"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { BrushCleaning } from "lucide-react";
import { clearCartAction } from "@lib/apis/cart/clear-logged-cart.api";
import { useRouter } from "@i18n/navigation";
import { ApiResponse, CartErrorResponse } from "@lib/types/components/cart";
import { useTranslations } from "next-intl";

interface ClearCartResponse {
    message?: string;
}

export default function ClearCartButton() {
    // translations
    const t = useTranslations("cart");

    // refresh cart
    const router = useRouter();

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // handlers
    const handleClear = async () => {
        setIsLoading(true);

        // clear cart
        const res: ApiResponse<ClearCartResponse> = await clearCartAction();
        setIsLoading(false);

        // handle response errors
        if ("error" in res.payload) {
            const errorMsg = res.payload.error || res.payload.message || t("clear-failed");
            toast.error(errorMsg);
            return;
        }

        // handle success
        const successMsg = res.payload.message || t("clear-success");
        toast.success(successMsg);
        router.refresh();
    };

    // button component
    return (
        <Button
            onClick={handleClear}
            variant="secondary"
            disabled={isLoading}
            className="!flex w-[11rem] items-center justify-center gap-2 text-sm font-semibold"
        >
            <BrushCleaning size={20} />
            {isLoading ? t("clearing") : t("clear")}
        </Button>
    );
}
