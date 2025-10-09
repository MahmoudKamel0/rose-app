import { Truck, RefreshCcw, ShieldCheck, Headset } from "lucide-react";

export default function Features() {
    // Variable
    const featuresItems = [
        {
            icon: <Truck size={28} color="white" strokeWidth={1.5} />,
            title: "Free Delivery",
            subTitle: "For orders above 120 EGP",
        },
        {
            icon: <RefreshCcw size={28} color="white" strokeWidth={1.5} />,
            title: "Get Refund",
            subTitle: "Refunds within 30 days",
        },
        {
            icon: <ShieldCheck size={28} color="white" strokeWidth={1.5} />,
            title: "Safe Payment",
            subTitle: "100% Secure Payment",
        },
        {
            icon: <Headset size={28} color="white" strokeWidth={1.5} />,
            title: "24/7 Support",
            subTitle: "Contact us at any time",
        },
    ];

    return (
        <section className="mx-auto mb-10 h-[9rem] w-full max-w-7xl px-4">
            <div className="flex items-center justify-center rounded-md bg-[#FBEAEA] py-10 dark:bg-zinc-700">
                <div className="grid grid-cols-4 gap-x-10">
                    {/* Mapping Array To Distract Data */}
                    {featuresItems.map((item) => (
                        <div key={item.title} className="flex flex-col items-center space-y-2 text-center">
                            <div className="flex gap-3 p-2 dark:p-[var(--soft-pink-200)]">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A6252A] dark:bg-pink-200 dark:text-zinc-200">
                                    {/* Icon */}
                                    {item.icon}
                                </div>
                                <div className="py-2 text-start">
                                    <p className="text-xl font-semibold text-[#A6252A] dark:text-pink-200">
                                        {/* Tittle */}
                                        {item.title}
                                    </p>
                                    <span className="text-sm text-gray-600 dark:text-[#71717A]">
                                        {/* SubTittle */}
                                        {item.subTitle}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
