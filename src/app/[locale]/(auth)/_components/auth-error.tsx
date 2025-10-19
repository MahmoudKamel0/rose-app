import { XCircle } from "lucide-react";

export function AuthError({ error }: { error: string }) {
    return (
        <div className="mb-9 flex w-full flex-col items-center">
            <div className="relative h-9 w-full p-3">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full">
                    <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="w-full truncate border border-red-800 bg-red-50 px-4 py-2 text-center font-mono text-sm font-normal text-red-600 dark:bg-zinc-900 dark:text-red-500">
                    {/* Error message */}
                    {error}
                </div>
            </div>
        </div>
    );
}
