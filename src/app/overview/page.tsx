import Header from "@components/layout/header";
import Headers from "@app/_components/header/header";
import Occasions from "@app/_components/occasions/occasions";
import Features from "@app/_components/features/Features";

export default function HomePage() {
    return (
        <main className="mt-5 flex flex-col items-center justify-center">
            {/* Header */}
            <Header />
            <Headers />
            <Occasions />
            <Features />
        </main>
    );
}
