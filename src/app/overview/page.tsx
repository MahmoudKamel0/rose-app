<<<<<<< HEAD
import Header from "@components/layout/header";

export default function HomePage() {
    return (
        <>
            <Header />
            <p>hello world</p>
        </>
=======
import Features from "@app/_components/features/features";
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
>>>>>>> f548faeb73a5e172321986a7289b20a097d352d4
    );
}
