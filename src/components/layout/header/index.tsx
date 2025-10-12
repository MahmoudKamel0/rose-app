import React from "react";
import Notification from "./components/Notification";

export default function Header() {
    return (
        <header className="flex h-10 w-full items-center justify-between bg-white p-4 text-red-500 shadow-md dark:text-white">
            {/* Title */}
            <h2>Rose</h2>

            {/* Notification */}
            <Notification />
        </header>
    );
}
