import { Button } from "@components/ui/button";
import { useTranslations } from "next-intl";
import { useAddForgetPasswordEmail } from "../_hooks/use-add-forget-password-email";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function ResendOtpButton({ email }: { email: string | null }) {
    // Translation hook scoped to "otp" namespace
    const t = useTranslations("otp");
    //  Cooldown state (in 1 minute)
    const [cooldown, setCooldown] = useState(60); //  start disabled for 60 seconds
    // React Query mutation for resending OTP
    const { mutateAsync, isPending } = useAddForgetPasswordEmail();

    
    //  Handle resend OTP click
    const handleResend = async () => {
        if (!email || cooldown > 0) return;
        
        await mutateAsync(
            { email },
            {
                onSuccess: () => {
                    toast.success(t("toast.success.title"), {
                        description: t("toast.success.description"),
                        duration: 3000,
                    });
                    
                    // ⏳ Restart cooldown (1 minute)
                    setCooldown(60);
                },
                onError: () => {
                    toast.error(t("toast.error.title"), {
                        description: t("toast.error.description"),
                        duration: 3000,
                    });
                },
            }
        );
    };

    
    //  Translated countdown label
    const countdownLabel = t("resend-in", { seconds: cooldown });
    
    //  Disable button if pending or in cooldown
    const isDisabled = isPending || cooldown > 0;
    
    //  Countdown effect
    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [cooldown]);
    return (
        <div className="flex w-full justify-end">
            <Button type="button" variant="ghost" onClick={handleResend} disabled={isDisabled}>
                {isPending ? t("sending") : cooldown > 0 ? countdownLabel : t("send-new")}
            </Button>
        </div>
    );
}
