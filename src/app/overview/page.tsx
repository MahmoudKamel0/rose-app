import GallerySection from "@components/layout/gallary-section/gallery-section";

import { cn } from "@lib/utils/cn.utils";

export default function HomePage() {
    return (
        <>
            <div className={cn("mx-auto w-[1281px] bg-red-300")}>
                <GallerySection />
            </div>
        </>
    );
}
