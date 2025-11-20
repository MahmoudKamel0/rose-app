import TabsSection from "./tabs";
import BtnSecondary from "@components/shared/btn-secondary";
import HighlightedHeading from "@components/shared/highlighted-heading";
import { getOccasions } from "@lib/apis/most-popular.api";
import { OccasionProps } from "@lib/types/components";

export default async function MostPopularSection() {
    const data = await getOccasions();

    if (!data?.occasions?.length) {
        return <p>No occasions found.</p>;
    }

    /* Filter and sort occasions to prioritize those with the highest number of products */
    const topFour = data.occasions
        .filter((o: OccasionProps) => o.productsCount > 0)
        .sort((a: OccasionProps, b: OccasionProps) => b.productsCount - a.productsCount)
        .slice(0, 4);

    return (
        <section id="most-popular" className="p-6">
            <HighlightedHeading text="Most Popular" highlightWidth="150px" borderWidth="60px" />
            {/* Render the tabs component and pass the top four occasions as props */}
            {/* <TabsSection topFour={topFour} /> */}
            <div className="flex justify-end">
                <BtnSecondary text="View More " />
            </div>
        </section>
    );
}
