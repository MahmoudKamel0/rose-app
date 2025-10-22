export async function getProductsByPrice(priceFrom?: number, priceTo?: number) {
  try {
    const params = new URLSearchParams();
    // Create query params
    if (priceFrom !== undefined) params.set("price[gte]", priceFrom.toString());
    if (priceTo !== undefined) params.set("price[lte]", priceTo.toString());

    const payload = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/products?${params.toString()}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });
    // Check if the request is ok 200
    if (!payload.ok) {
      throw new Error(`Failed to fetch: ${payload.status}`);
    }

    const data = await payload.json();

    if (Array.isArray(data?.products)) {
      return data.products;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching products by price:", error);
    return [];
  }
}
