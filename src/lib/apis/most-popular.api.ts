
/* Get all occasions */ 
export async function getOccasions() {
  try {
    const payload = await fetch(`${process.env.API}/occasions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!payload.ok){
      throw new Error(`Failed to fetch occasions: ${payload.status}`);
    } 
    const data = await payload.json();
    return data;

  } catch (error) {
    console.error("Error fetching occasion:", error);
    return null;
  }
}

/* filter products by occasion id */ 
export async function getProductsByOccasion(occasionId: string) {
  try {
    const payload = await fetch(`${process.env.API}/products?occasion=${occasionId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!payload.ok) {
      throw new Error(`Failed to fetch products: ${payload.status}`);
    }

    const data = await payload.json();
    return Array.isArray(data.products) ? data.products.slice(0, 12) : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
