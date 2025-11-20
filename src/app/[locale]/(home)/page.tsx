import AboutSection from "@components/features/application/home/about-section/about-section";
// import MostPopularSection from "@components/features/application/home/most-popular-section/indxe";
import BestSellingSection from "@components/features/application/home/best-selling-section/best-selling";
import CompaniesSection from "@components/features/application/home/companies-section/companies-section";
import FeaturesSection from "@components/features/application/home/features-section";
import GallerySection from "@components/features/application/home/gallary-section/gallery-section";
import SpecialGiftsSection from "@components/features/application/home/special-gifts-section";
import TestimonialsSection from "@components/features/application/home/testimonials-section/testimonials-section";
import { Container } from "@components/layout/container";

export default function HomePage() {
    return (
        <main>
            <Container>
                <SpecialGiftsSection />
                <FeaturesSection />
                <BestSellingSection />
                {/* <MostPopularSection /> */}
                <AboutSection />
                <GallerySection />
            </Container>
            <TestimonialsSection />
            <Container>
                <div className="w-7xl mx-auto flex flex-col">
                    <CompaniesSection />
                </div>
            </Container>
        </main>
    );
}
