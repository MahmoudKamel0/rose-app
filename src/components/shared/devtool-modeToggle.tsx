"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

/**
 * DevtoolModeToggle
 *
 * A simple floating button for toggling between light and dark mode for development and debugging purposes.
 *
 * - Shows a Sun icon when in light mode, and switches to a Moon icon for dark mode.
 * - Theme is toggled using the `next-themes` `setTheme` method.
 * - The button is fixed at the bottom-right corner of the screen.
 *
 * @returns {JSX.Element} The toggle button component.
 */

export default function DevtoolModeToggle(): JSX.Element {
    const [mode, setMode] = useState(false);
    const { setTheme } = useTheme();

    return (
        <button
            className="fixed bottom-14 right-14 flex h-14 w-14 items-center justify-center rounded-full bg-maroon-50 dark:bg-softpink-50 [&_svg]:stroke-black"
            onClick={() => {
                setTheme(mode ? "dark" : "light");
                setMode(!mode);
            }}
        >
            {mode ? <Moon /> : <Sun />}
        </button>
    );
}
