
export async function getBestSellingProducts() {
  try {
    const payload = await fetch(`${process.env.API}/products?sort=-sold`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!payload.ok) {
      throw new Error(`HTTP error! Status: ${payload.status}`);
    }

    const data = await payload.json();
    return Array.isArray(data.products) ? data.products : [];

  } catch (error) {
    console.error('Failed to fetch Best Selling Products:', error);
    throw error;
  }
}
