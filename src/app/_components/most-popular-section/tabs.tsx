import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "@components/shared/product-card";
import { getProductsByOccasion } from "@lib/apis/most-popular.api";

/*declare occasion*/
interface Occasion {
  _id: string;
  name: string;
  productsCount: number;
}

/*declare Product*/
interface Product {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  sold: number;
  quantity: number;
  rateAvg: number;
}
/*This component receives an array of top occasions as a prop from most-popular component */
export default async function TabsSection({ topFour }: { topFour: Occasion[] }) {
  if (!topFour?.length) return <p>No occasions found.</p>;

  // Fetch products for each of the top four occasions in parallel,
// then merge each occasion object with its corresponding products array.
  const productsByOccasion = await Promise.all(
    topFour.map(async (occasion) => {
      const products = await getProductsByOccasion(occasion._id);
      return { ...occasion, products };
    })
  );

  return (
    <Tabs defaultValue={topFour[0]._id} className="w-full">
      <TabsList className="flex justify-end gap-4 mb-6 bg-transparent mt-[-30px] mb-14">
        {/* render a tab button for each top occasion so the user can switch between different occasion tabs */}
        {topFour.map((occasion) => (
          <TabsTrigger key={occasion._id} value={occasion._id} className="text-base text-zinc-700 dark:text-zinc-400 font-medium  data-[state=active]:text-maroon-600 dark:data-[state=active]:text-softpink-200 data-[state=active]:shadow-none p-1.5">
            {occasion.name}
          </TabsTrigger>
        ))}
      </TabsList>
    {/* loop through the top occasions and render a tab for each one with its products */}
      {productsByOccasion.map(({ _id, name, products }) => (
        <TabsContent key={_id} value={_id}>
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              {products?.length ? (
                <div className="grid grid-cols-4 gap-6">
                  {products.map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No products found for this occasion.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
