import Image from "next/image";
export default function Occasions() {
    // Variable
    const cardContent = [
        {
            tittle: "Celebrate Her Forever with a Gift She’ll Always Remember",
            img: "/images/img1.png",
            subTittle: "Wedding",
        },
        {
            tittle: "Honor the Beginning of a Beautiful Journey Together",
            img: "/images/img2.png",
            subTittle: "Engagement",
        },
        {
            tittle: "Mark Every Year of Love with a Meaningful Surprise",
            img: "/images/img3.png",
            subTittle: "Anniversary",
        },
    ];
    return (
        <section className="mb-10 flex gap-5">
            {/* Mapping Array */}
            {cardContent.map((item, index) => (
                <div key={index} className="relative h-72 w-[25.5rem]">
                    <Image src={item.img} width={410} height={270} alt={item.subTittle} className="h-full w-full rounded-md object-cover" />
                    <div className="absolute inset-0 flex w-full flex-col justify-end overflow-hidden rounded-md border-0 bg-black/25 px-6 pb-5 text-white">
                        <div className="w-full">
                            <div className="inline-flex items-center justify-center rounded-full bg-[#FBEAEA] px-2.5 py-1">
                                <span className="text-sm font-medium text-[#A6252A]">
                                    {/* Tittle */}
                                    {item.subTittle}
                                </span>
                            </div>
                            <p className="text-2xl leading-snug font-semibold text-white">
                                {/* SubTittle */}
                                {item.tittle}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
