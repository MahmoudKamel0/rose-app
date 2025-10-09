const API = process.env.NEXT_PUBLIC_API;

export async function getOccasionById(id: string) {
  try {
    const res = await fetch(`${API}/occasions/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch occasion");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching occasion:", error);
    return null;
  }
}


// export async function getProductsByOccasion(occasionId: string) {
//   try {
//     const payload = await fetch(
//       `${process.env.API}/products?occasion_id=${occasionId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!payload.ok) {
//       throw new Error(`HTTP error! Status: ${payload.status}`);
//     }

//     const data = await payload.json();
//     return Array.isArray(data.data) ? data.data : [];
//   } catch (error) {
//     console.error(
//       `Failed to fetch products for occasion ${occasionId}:`,
//       error
//     );
//     throw error;
//   }
// }
