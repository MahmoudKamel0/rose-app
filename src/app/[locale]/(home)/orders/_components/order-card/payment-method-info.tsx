import { Banknote, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

// Define possible payment methods
type PaymentMethod = "Cash" | "Credit Card";

interface PaymentMethodInfoProps {
    paymentMethod: PaymentMethod; // The payment method used for the order
}

export default function PaymentMethodInfo({ paymentMethod }: PaymentMethodInfoProps) {
    // Initialize translations for the "orders" namespace
    const t = useTranslations("orders");

    // Determine if the payment method is cash
    const isCash = paymentMethod === "Cash";

    // Choose the appropriate icon based on payment method
    const paymentIcon = isCash ? <Banknote /> : <CreditCard />;

    // Translate the payment method text
    const translatedMethod = isCash ? t("paymentMethodInfo.cash") : t("paymentMethodInfo.creditCard");

    return (
        // Display payment method information with icon
        <h6 className="flex items-center gap-2.5 font-semibold">
            {t("paymentMethodInfo.label")}
            <span className="flex items-center gap-1 font-medium text-zinc-500">
                {paymentIcon} {translatedMethod}
            </span>
        </h6>
    );
}
