import Features from "@app/_components/features/Features";
import Headers from "@app/_components/header/header";
import Occasions from "@app/_components/occasions/occasions";

export default function HomePage() {
    return (
        <main className="mt-5 flex flex-col items-center justify-center">
            {/* Header */}
            <Headers />
            <Occasions />
            <Features />
        </main>
    );
}
