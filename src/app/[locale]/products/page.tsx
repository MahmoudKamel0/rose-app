import OccasionFilter from '@components/features/occasion-filter/occasion-filter'
import PriceFilter from '@components/features/price-filter/price-filter'
import React from 'react'

export default function Products() {
  return (
    <main className="mx-auto flex w-7xl mt-3">
      <div className="w-1/4 pe-6 border-e-1 border-zinc-100 h-screen">
        <OccasionFilter />
        <PriceFilter />
      </div>
      <div className="w-3/4 bg-maroon-50 px-5 ms-6">
        <h1>Products List...</h1>
      </div>
    </main>
  )
}