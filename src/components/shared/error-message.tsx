"use client";

import { ReactNode } from "react";

interface ErrorMessageProps {
    message: string | ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="relative h-fit w-full rounded-md border border-red-300 bg-red-50 p-3 text-red-600">
            <p className="text-center text-sm">{message}</p>
        </div>
    );
};
