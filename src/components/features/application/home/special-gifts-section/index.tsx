import Occasions from "./components/occasions";
import ShopNowSection from "./components/shop-now";
import SliderOffers from "./components/slider-offers";

/**
 * SpecialGiftsSection Component
 *
 * Displays the special gifts section on the homepage.
 * Contains featured offers or promotions, and includes the ShopNowSection
 * which encourages users to explore and purchase highlighted products.
 * Typically used in the home page to attract attention to special deals.
 */
export default function SpecialGiftsSection() {
    return (
        <section id="special-gifts" className="mt-10">
            <div className="flex items-center gap-6 mb-6">
                <ShopNowSection />
                <SliderOffers />
            </div>
            <Occasions />
        </section>
    );
}

