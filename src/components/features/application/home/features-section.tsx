import { Truck, RefreshCcw, ShieldCheck, Headset } from "lucide-react";

export default function FeaturesSection() {
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
        <section className="mb-28 grid h-36 w-full grid-cols-4 items-center gap-14 rounded-xl bg-maroon-50 px-16 dark:bg-zinc-700">
            {/* Mapping Array To Distract Data */}
            {featuresItems.map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maroon-600 dark:bg-pink-200">
                        {/* Icon */}
                        {item.icon}
                    </div>
                    <div className="py-2 text-start">
                        <h3 className="text-xl font-semibold text-[#A6252A] dark:text-pink-200">
                            {/* Tittle */}
                            {item.title}
                        </h3>
                        <span className="text-sm text-gray-600 dark:text-[#71717A]">
                            {/* SubTittle */}
                            {item.subTitle}
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
}
