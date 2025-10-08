import FeatureItem from "./feature-item";

const features = [
    "Competitive Prices & Easy Shopping",
    "Premium Quality & Elegant Packaging",
    "Perfect for Every Occasion",
    "Fast & Reliable Delivery",
];

export default function AboutFeatures() {
    return (
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => (
                <FeatureItem key={feature} title={feature} />
            ))}
        </div>
    );
}
