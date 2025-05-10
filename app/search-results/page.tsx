"use client"
import { redirect, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ProductType } from '@/types/productTypes'
import Image from 'next/image'
import Icon from '@/public/svg/svgicons'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')
  const stringifiedResults = localStorage.getItem("searchResults")
  const results = stringifiedResults ? JSON.parse(stringifiedResults) : redirect("/categories");

  return (
    <main className="px-8 py-6">
      <section className="max-w-7xl mx-auto">
        <div className="flex max-md:flex-col items-center max-md:items-start justify-between mb-6">
          <h1 className="text-2xl font-semibold">
            Search Results for &quot;{query}&quot;
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {results.length} results found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((result: ProductType, i: number) => (
              <Link
                key={i}
                href={{pathname: `/categories/${result.category}/${result.productName}`, query: { productInfo: JSON.stringify(result)}}}
                className="group"
              >
                <div className="bg-white dark:bg-[#0F1125] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-103">
                  <div className="h-48 p-5 w-full bg-[#efefef] dark:bg-[#1b2048]">
                    <Image
                      src={result.productImage}
                      alt={result.productName}
                      width={1000}
                      height={1000}
                      className="object-contain h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-medium mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">{result.productName}</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 capitalize">{result.category}</p>
                    <p className="text-lg font-semibold"><span className="mr-[3px]">₦</span>{result.productPrice.toLocaleString()}</p>
                    <div className="flex mt-2">{Array.from({ length: Math.trunc(result.productRating) }, (_, index) => <Icon key={index} name="star" noPointer noHover/>)} {result.productRating - Math.trunc(result.productRating) > 0.5 && <Icon name="halfStar" noPointer noHover/>}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No results found for your search.
            </p>
            <Link 
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}