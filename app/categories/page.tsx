import Image from "next/image";
import Link from "next/link";
import data from "@/data/products.json";

function Categories() {
  const allCategories = [...new Set(data.map((product) => product.category))];

  return (
    <main className="mt-[40px]">
      <p className="capitalize text-3xl font-poppins font-bold text-black dark:text-white mb-[5px]">
        Shop
      </p>
      <p className="mb-[30px] font-poppins text-[#a3a3a3]">
        Browse a variety of categories tailored to your needs
      </p>

      <section className="grid grid-cols-3 max-md:grid-cols-2 gap-8 max-md:gap-5 max-w-[1000px] mx-auto">
        {allCategories.map((category, i) => (
          <Link href={`/categories/${category}`} key={i}>
            <article
              className={`rounded-xl shadow-lg max-md:shadow-sm relative group aspect-square flex justify-start items-end p-5 max-sm:p-2.5`}
            >
              <Image
                src={`/categories/${category}.jpg`}
                alt={category}
                fill
                className="absolute inset-0 z-[10] object-center object-cover rounded-xl"
              />
              <div className="opacity-0 absolute inset-0 group-hover:opacity-100 bg-black/65 max-sm:bg-black/75 backdrop-blur-xs transition-all 300 ease-in-out rounded-xl z-[100]" />
              <p className="capitalize text-2xl max-sm:text-lg font-poppins font-bold text-white group-hover:text-[#559EDD] z-[100]">
                {category === "tv" ? "Televisions" : category}
              </p>
            </article>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Categories;
