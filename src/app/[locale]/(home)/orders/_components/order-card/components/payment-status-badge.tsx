import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PaymentStatusBadgeProps {
  isPaid: boolean;
}

const PaymentStatusBadge = ({ isPaid }: PaymentStatusBadgeProps) => (
  <Badge
    variant="secondary"
    className={`${
      isPaid ? "bg-[#00BC7D]" : "bg-gray-400"
    } rounded-full text-white flex justify-center items-center gap-2.5 font-semibold`}
  >
    {isPaid && <Check width={20} height={20} />}
    {isPaid ? "Paid" : "Not Paid"}
  </Badge>
);

export default PaymentStatusBadge;
