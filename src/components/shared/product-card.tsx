"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@lib/utils/cn.utils";
import { ShoppingCart, Star } from "lucide-react"

export default function ProductCard({ product }) {
  if (!product) return null

  return (
    <Card className={cn("overflow-hidden transition-all duration-200 shadow-none border-none")}>
      <div className={cn("relative")}>
        <Image
          src={product.imgCover || "/images/placeholder.jpg"}
          alt={product.title}
          width={302}
          height={272}
          className={cn("object-cover w-full h-64 rounded-xl")}
        />

        {/* HOT Badge */}
        {product.sold > 300 && (
          <Badge className={cn("absolute top-2 right-2 bg-maroon-50 text-xs py-0.5 px-2 rounded-full text-maroon-600 uppercase")}>
            HOT
          </Badge>
        )}

        {/* NEW Badge */}
        {product.sold < 20 && (
          <Badge className={cn("absolute top-2 right-2 bg-zinc-100 py-0.5 px-2 rounded-full text-zinc-700 text-xs uppercase")}>
            NEW
          </Badge>
        )}

        {/* OUT OF STOCK Badge */}
        {product.quantity < 1 && (
          <Badge className={cn("absolute top-2 right-2 bg-red-600 py-0.5 px-2 rounded-full text-white  text-xs uppercase")}>
            OUT OF STOCK
          </Badge>
        )}
      </div>

      <CardContent className={cn("p-4 space-y-3")}>
        {/* Product Title */}
        <h3 className={cn("font-semibold text-maroon-700 text-lg line-clamp-1 capitalize")}>
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
      {i < product.rateAvg ? (
        <Star className="w-4 h-4" fill="#FBA707" strokeWidth={0}/>
      ) : (
        <Star className="w-4 h-4" color="#FBA707" strokeWidth={1} />
      )}
    </span>
          ))}
        </div>

       {/* Prices + Add to cart*/}
<div className="flex items-center justify-between">
  {/* Prices */}
  <div className="flex items-center gap-2">
    <p className="font-medium text-maroon-700 text-base">
      {product.priceAfterDiscount} EGP
    </p>
    {product.priceAfterDiscount < product.price && (
      <p className="line-through font-medium text-zinc-400 text-base">
        {product.price} EGP
      </p>
    )}
  </div>

  {/* Add to Cart Button */}
  <Button
    size="icon"
    className={cn(
      "flex items-center justify-center rounded-full w-10 h-10 bg-maroon-600 text-white leading-none"
    )}
  >
    <ShoppingCart
      className="inline-block align-middle"
      style={{ width: 24, height: 24 }}
      color="#ffffff"
      strokeWidth={1}
    />
  </Button>
</div>

      </CardContent>
    </Card>
  )
}
