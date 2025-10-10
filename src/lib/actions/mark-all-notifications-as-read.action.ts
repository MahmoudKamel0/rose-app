"use server";

export async function MarkAllNotificationsAsRead() {
    try {
        const token = process.env.ACCESS_TOKEN;
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Prefer the standard Authorization header (Bearer token).
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        const res = await fetch(
            // `${process.env.BASE_URL!}${process.env.CHECK_QUESTIONS!}`,
            `${process.env.BASE_URL}${process.env.MARK_ALL_NOTIFICATION_AS_READ_URL}`,
            {
                method: "POST",
                headers,
            }
        );
        const response: ApiResponse<MarkAllNotificationsAsReadRequest> = await res.json();

        if ("error" in response) {
            throw new Error(response.error || "Something went wrong");
        }

        return response;
    } catch (err) {
        return { error: `${err || "There's something wrong, please try again"}` };
    }
}
