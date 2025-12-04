export async function getAllOccasions() {
  try {
    const payload = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/occasions`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!payload.ok) {
        throw new Error(`Failed to fetch: ${payload.status}`);
    }

    const data = await payload.json();

    if (Array.isArray(data?.occasions)) {
      return data.occasions;
    } else {
        // Return empty array to keep the app no crash
      return [];
    }
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return [];
  }
}