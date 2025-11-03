interface OrderHeaderProps {
  orderNumber: string;
  createdAt: string;
}

const OrderHeader = ({ orderNumber, createdAt }: OrderHeaderProps) => (
  <div className="order-item h-14 p-4 bg-[#A6252A] flex justify-between rounded-t-lg">
    <h3 className="font-semibold text-2xl text-white">
      Order <span>#{orderNumber}</span>
    </h3>
    <p className="text-zinc-100 text-base font-normal">
      Created in: <time className="font-semibold">{createdAt}</time>
    </p>
  </div>
);

export default OrderHeader;
