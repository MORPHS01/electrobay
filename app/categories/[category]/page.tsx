"use client";
import { useParams } from "next/navigation";
import data from "@/data/products.json";
import { ProductCard } from "@/components";
import { ProductType } from "@/types/productTypes";

function Category() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);

  const productsInCategory = data.filter(
    (product) => product.category === category
  );

  return (
    <main className="mt-[40px]">
      <p className="capitalize text-3xl font-poppins font-bold text-black dark:text-white mb-[30px]">
        {category === "tv" ? "Televisions" : category}
      </p>

      <section className="grid max-md:grid-cols-2 max-xl:grid-cols-3 grid-cols-4 max-md:gap-4 gap-6">
        {productsInCategory.map((product: ProductType, i: number) => (
          <ProductCard key={i} product={product} />
        ))}
      </section>
    </main>
  );
}

export default Category;
