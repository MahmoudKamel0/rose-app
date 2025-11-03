import Image from "next/image";
import { Star } from "lucide-react";

interface OrderProductItemProps {
  title: string;
  imageUrl: string;
  rating: number;
  ratingCount: number;
  quantity: number;
  price: string;
}

export default function OrderProductItem({
  title,
  imageUrl,
  rating,
  ratingCount,
  quantity,
  price,
}: OrderProductItemProps) {
  return (
    <div className="h-36 flex rounded-lg bg-zinc-50 gap-2.5">
      <div className="relative w-[117px] h-full bg-red-50 rounded-s-lg overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="h-full flex-1 p-2.5 rounded-s-3xl">
        <div className="h-full flex flex-col justify-between px-2.5">
          <div className="flex flex-col">
            <h2 className="text-[#741C21] text-lg font-semibold">{title}</h2>
            <div className="flex gap-1.5 items-center">
              <Star
                className="stroke-[#FFA508] fill-[#FFA508]"
                width={16.67}
                height={15.89}
              />
              <p className="capitalize">
                rating: <span className="font-medium">{rating}/5</span>
              </p>
              <p className="text-blue-600 font-medium">
                ({ratingCount} rating)
              </p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-sm text-[#741C21] font-medium">
              (×{quantity})
            </span>
            <h5 className="font-semibold text-xl">{price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
