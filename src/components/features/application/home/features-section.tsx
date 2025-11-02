import { Truck, RefreshCcw, ShieldCheck, Headset } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
    // Translation
    const t = useTranslations("features");

    // Variable
    const features = [
        {
            icon: <Truck size={40} className="text-zinc-50 dark:text-zinc-900" strokeWidth={1.5} />,
            title: t("free-delivery.title"),
            subTitle: t("free-delivery.subTitle"),
        },
        {
            icon: <RefreshCcw size={40} className="text-zinc-50 dark:text-zinc-900" strokeWidth={1.5} />,
            title: t("get-refund.title"),
            subTitle: t("get-refund.subTitle"),
        },
        {
            icon: <ShieldCheck size={40} className="text-zinc-50 dark:text-zinc-900" strokeWidth={1.5} />,
            title: t("safe-payment.title"),
            subTitle: t("safe-payment.subTitle"),
        },
        {
            icon: <Headset size={40} className="text-zinc-50 dark:text-zinc-900" strokeWidth={1.5} />,
            title: t("support.title"),
            subTitle: t("support.subTitle"),
        },
    ];

    return (
        <section className="mb-28 grid h-36 w-full grid-cols-4 items-center gap-14 rounded-xl bg-maroon-50 px-16 dark:bg-zinc-700">
            {/* Mapping Array To Distract Data */}
            {features.map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maroon-600 dark:bg-softpink-200 rtl:flex-row-reverse">
                        {/* Icon */}
                        {item.icon}
                    </div>
                    <div className="py-2 text-start">
                        <h3 className="text-xl font-semibold text-maroon-600 dark:text-pink-200">
                            {/* Tittle */}
                            {item.title}
                        </h3>
                        <span className="text-sm text-zinc-500 dark:text-zinc-300">
                            {/* SubTittle */}
                            {item.subTitle}
                        </span>
                    </div>
                </div>
            ))}
        </section>
    );
}
