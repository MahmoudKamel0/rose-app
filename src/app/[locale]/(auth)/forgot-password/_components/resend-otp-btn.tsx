import { Button } from "@components/ui/button";
import { useTranslations } from "next-intl";
import { useAddForgetPasswordEmail } from "../_hooks/use-add-forget-password-email";
import { toast } from "sonner";

export default function ResendOtpButton({ email }: { email: string | null }) {
    // Translation hook scoped to "otp" namespace
    const t = useTranslations("otp");

    // hook to send email request
    const { mutateAsync, isPending, error } = useAddForgetPasswordEmail();

    const handleResend = async () => {
        if (!email) return;
        await mutateAsync(
            { email },
            {
                onSuccess: () => {
                    toast.success("OTP resent successfully", {
                        description: "Please check your email for the new OTP",
                        duration: 4000,
                    });
                },
            }
        );
    };

    return (
        <div className="flex w-full justify-end">
            <Button type="button" variant="ghost" onClick={handleResend} disabled={isPending}>
                {isPending ? t("sending") : t("send-new")}
            </Button>
        </div>
    );
}
