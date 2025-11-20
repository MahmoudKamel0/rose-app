"use client";
import { cn } from "@lib/utils/cn.util";
import { useTheme } from "next-themes";
import * as React from "react";

export function ModeToggle() {
    const { setTheme } = useTheme();

    return (
        <div className={cn("buttons")}>
            <button onClick={() => setTheme("light")}>light</button>
            <br />
            <button onClick={() => setTheme("dark")}>dark</button>
            <br />
            <button onClick={() => setTheme("system")}>system</button>
            <br />
        </div>
    );
}
