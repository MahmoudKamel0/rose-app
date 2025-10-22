import React from 'react'
import FilterSidebar from '@components/features/filters-sidebar/filters-sidebar'

export default function Products() {
  return (
    <section className="flex m-10">
      <div className="w-1/4 ">
        <FilterSidebar/>
      </div>
      <div className="w-3/4 bg-maroon-50 px-5">
        <h1>Products List...</h1>
      </div>
    </section>
  )
}