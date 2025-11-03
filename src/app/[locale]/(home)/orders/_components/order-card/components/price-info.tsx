import { Badge } from "@/components/ui/badge";
import { Check, Banknote, CreditCard } from "lucide-react";

interface PriceInfoProps {
  totalPrice: string;
  isPaid: boolean;
}

export default function PriceInfo({ totalPrice, isPaid }: PriceInfoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <h3 className="font-medium text-2xl ">
        Total Price: 
        <span className="font-semibold ms-1">{totalPrice}</span>
      </h3>
      <Badge
        variant="secondary"
        className={`${
          isPaid ? "bg-[#00BC7D]" : "bg-gray-400"
        } rounded-full text-white flex justify-center items-center gap-2.5 font-semibold`}
      >
        {isPaid && <Check width={20} height={20} />}
        {isPaid ? "Paid" : "Not Paid"}
      </Badge>
    </div>
  );
}
