import { Banknote, CreditCard } from "lucide-react";

type PaymentMethod = "Cash" | "Credit Card";

interface PaymentMethodInfoProps {
  paymentMethod: PaymentMethod;
}

const PaymentMethodInfo = ({ paymentMethod }: PaymentMethodInfoProps) => {
  const paymentIcon = paymentMethod === "Cash" ? <Banknote /> : <CreditCard />;

  return (
    <h6 className="font-semibold flex gap-2.5 items-center">
      Payment Method:
      <span className="text-zinc-500 font-medium flex gap-1 items-center">
        {paymentIcon} {paymentMethod}
      </span>
    </h6>
  );
};

export default PaymentMethodInfo;
