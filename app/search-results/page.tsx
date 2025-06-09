"use client";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductType } from "@/types/productTypes";
import { ProductCard } from "@/components";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const stringifiedResults = window.localStorage.getItem("searchResults");
  const results = stringifiedResults
    ? JSON.parse(stringifiedResults)
    : redirect("/categories");

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
          <div className="grid max-md:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 max-md:gap-4 gap-6">
            {results.map((result: ProductType, i: number) => (
              <ProductCard key={i} product={result} />
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
  );
}
