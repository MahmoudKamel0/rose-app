import HighlightedHeading from "@components/shared/highlighted-heading";
import Subtitle from "@components/shared/subtitle";
import { cn } from "@lib/utils/cn.utils";

export default function HomePage() {
    return (
        <>
            <div className={cn("flex flex-col items-center gap-2 p-4 text-center")}>
                <Subtitle text="Gallery" />
                <HighlightedHeading text="Check Out our Wonderful Gallery" highlightWidth="350px" borderWidth="150px" />
            </div>
        </>
    );
}
