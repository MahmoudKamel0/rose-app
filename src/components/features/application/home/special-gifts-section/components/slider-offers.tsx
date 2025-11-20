"use client"; //? for solve problem "TypeError: Cannot read properties of null (reading 'useContext')"
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@components/ui/carousel";
import { IMAGES_SLIDERS_OFFERS } from "@lib/constants/component-ui.constant";
import Autoplay from "embla-carousel-autoplay";

/**
 * SliderOffers Component
 *
 * Renders a carousel slider showcasing special gift offer images.
 * Each slider item can include an image, a title, a description, and a call-to-action button.
 * Intended for use in the home page "Special Gifts" section alongside ShopNowSection.
 * Leverages Card, Carousel, and Button UI components for consistent design and interactivity.
 */
export default function SliderOffers() {
    return (
        // Uses Autoplay plugin to automatically slide every 2 seconds, loop images
        <Carousel className="flex-auto" opts={{ loop: true }} plugins={[Autoplay({ delay: 2000 })]}>
            <CarouselContent>
                {IMAGES_SLIDERS_OFFERS.map((item) => (
                    <CarouselItem key={item.title} className="h-441 w-full">
                        <Card
                            className="relative h-full overflow-hidden rounded-xl before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-r before:from-black/80 before:to-black/0"
                            style={{ background: `url(${item.imagePath}) center/cover` }}
                        >
                            {/* CardContent displays the overlay text and call-to-action button on top of the slider image */}
                            <CardContent className="z-5 relative flex h-full flex-col justify-end p-9 text-white">
                                <h2 className="text-4xl font-semibold">{item.title}</h2>
                                <p>{item.description}</p>
                                <Button className="mt-9">I’m buying!</Button>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="relative">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    );
}
