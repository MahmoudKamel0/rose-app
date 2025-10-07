import HighlightedHeading from "@components/shared/highlighted-heading";
import Subtitle from "@components/shared/subtitle";
import { cn } from "@lib/utils/cn.utils";
import Image from "next/image";


export default function GallerySection() {
  return (
    //  Main Gallery Section
    <section className="gallery-section">
      {/*  Section Header: Subtitle + Heading */}
      <div className={cn("flex flex-col items-center gap-2 p-4 text-center")}>
        <Subtitle text="Gallery" />
        <HighlightedHeading
          text="Check Out our Wonderful Gallery"
          highlightWidth="350px"
          borderWidth="150px"
        />
      </div>

      {/*  Image Grid Layout */}
      
      <div className="gift-collage  grid grid-cols-3 gap-4">
        {/* Right Column */}
        <div className="right flex flex-col gap-4">
          <div className="relative h-[617px]">
            <Image
              src="/images/maroon-gifts-event-tags.webp"
              alt="Maroon gift boxes with event tags"
              fill
              className="object-center"
            />
          </div>
          <div className="relative h-[406px]">
            <Image
              src="/images/red-roses-pink-chocolates.webp"
              alt="Red roses with pink chocolates"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Middle Column */}
        <div className="middle flex flex-col gap-4">
          <div className="relative h-[411px]">
            <Image
              src="/images/red-wedding-gifts.webp"
              alt="Red wedding gift boxes"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[611px]">
            <Image
              src="/images/ring-in-white-flowers.webp"
              alt="Ring placed inside white flowers"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Left Column */}
        <div className="left flex flex-col gap-4">
          <div className="relative h-[411px]">
            <Image
              src="/images/ring-box-peach-roses.webp"
              alt="Ring box surrounded by peach roses"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[611px]">
            <Image
              src="/images/engagement-ring-candle.webp"
              alt="Engagement ring and candle setup"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
