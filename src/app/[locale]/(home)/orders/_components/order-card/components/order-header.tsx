import { formatOrderDate } from "@lib/data/data";

interface OrderHeaderProps {
    orderNumber: string;
    createdAt: string;
}

const OrderHeader = ({ orderNumber, createdAt }: OrderHeaderProps) => (
    <div className="order-item flex h-14 justify-between rounded-t-lg bg-[#A6252A] p-4">
        <h3 className="text-2xl font-semibold text-white">
            Order <span>{orderNumber}</span>
        </h3>
        <p className="text-base font-normal text-zinc-100">
            Created in: <time className="font-semibold">{formatOrderDate(createdAt)}</time>
        </p>
    </div>
);

export default OrderHeader;
