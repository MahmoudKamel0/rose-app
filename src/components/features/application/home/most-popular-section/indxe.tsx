import HighlightedHeading from "@components/shared/highlighted-heading";
import { getAllOccasions } from "@lib/apis/most-popular.api";

export default async function MostPopularSection() {
    const data = await getAllOccasions();

    if (!data?.occasions?.length) {
        return <p>No occasions found.</p>;
    }

    return (
        <section id="most-popular" className="p-6">
            <HighlightedHeading text="Most Popular" highlightWidth="150px" borderWidth="60px" />
            {/* Render the tabs component and pass the top four occasions as props */}
            {/* <TabsSection topFour={topFour} /> */}
            {data.ma}
        </section>
    );
}
