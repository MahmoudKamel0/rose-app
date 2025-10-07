"use client";
import { Button } from "@components/ui/button.ui";
import { useState } from "react";

export default function HomePage() {
    const [status, isStatus] = useState(false);
    return (
        <>
            <p>hello world</p>
            <Button variant="red" disabled={status} isLoading={true}>
                Click
            </Button>
            <br />
            <br />
            <Button onClick={()=> isStatus(!status)}>disabled: {status ? "true" : "false"}</Button>
        </>
    );
}
