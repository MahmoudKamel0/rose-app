import Image from "next/image";
import { Link } from "@i18n/navigation";
import { Badge } from "@components/ui/badge";

export default function Occasions() {
    // Variable
    const cardContent = [
        {
            title: "Celebrate Her Forever with a Gift She’ll Always Remember",
            imagePath: "/images/img1.webp",
            badge: "Wedding",
        },
        {
            title: "Honor the Beginning of a Beautiful Journey Together",
            imagePath: "/images/img2.webp",
            badge: "Engagement",
        },
        {
            title: "Mark Every Year of Love with a Meaningful Surprise",
            imagePath: "/images/img3.webp",
            badge: "Anniversary",
        },
    ];

    return (
        <section className="mb-10 flex justify-between gap-5">
            {/* Mapping Array */}
            {cardContent.map((item) => (
                <Link
                    key={item.title}
                    href="/occasions"
                    className="relative h-72 overflow-hidden rounded-xl p-6 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-black/0 before:to-black/50"
                    style={{ background: `url(${item.imagePath}) center/cover` }}
                >
                    <div className="relative z-5 h-full flex flex-col justify-end">
                        <Badge variant="secondary">{item.badge}</Badge>
                        <h2 className="text-2xl font-semibold leading-snug text-white">{item.title}</h2>
                    </div>
                </Link>
            ))}
        </section>
    );
}
