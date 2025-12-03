export default function ErrorState({ message }: { message: string }) {
    return (
        <div className="flex h-[938px] flex-col items-center justify-center gap-4 rounded-lg bg-white p-6">
            {/* Error Icon */}
            <div className="rounded-full bg-red-100 p-4">
                <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
                    />
                </svg>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>

            {/* Message */}
            <p className="max-w-sm text-center text-gray-500">{message || "Failed to load data. Please try again later."}</p>

            {/* Retry */}
            <a href="" className="mt-2 rounded-md border border-red-400 px-4 py-2 text-red-600 transition hover:bg-red-50">
                Retry
            </a>
        </div>
    );
}
