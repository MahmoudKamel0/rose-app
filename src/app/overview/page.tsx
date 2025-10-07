import { cn } from "@lib/utils/cn.utils";
import BestSellingSection from "./_components/best-selling";

export default function HomePage() {
    return (
    <>
          <div className={cn("mx-auto w-[1281px] flex flex-col gap-32 py-20")}>
        <BestSellingSection></BestSellingSection>
        </div>
    </>
    );
}
