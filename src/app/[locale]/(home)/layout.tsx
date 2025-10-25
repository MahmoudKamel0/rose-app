import Header from "@components/layout/header";
import React from "react";

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    );
}
