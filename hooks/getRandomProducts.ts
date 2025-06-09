import { ProductType } from "@/types/productTypes";

export function getRandomProductsSameCategory(
  allProducts: ProductType[],
  currentProduct: ProductType,
  count: number = 4
): ProductType[] {
  // Filter products from the same category, excluding current product
  const categoryProducts = allProducts.filter(
    (product) =>
      product.category === currentProduct.category &&
      product.productId !== currentProduct.productId
  );

  // If we have fewer products than requested, return all available products
  if (categoryProducts.length <= count) {
    return categoryProducts;
  }

  // Shuffle array and get first 'count' items
  return categoryProducts.sort(() => Math.random() - 0.5).slice(0, count);
}

export function getRandomProductsDifferentCategories(
  allProducts: ProductType[],
  count: number = 4
): ProductType[] {
  // Get unique categories
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  // Shuffle categories
  const shuffledCategories = categories.sort(() => Math.random() - 0.5);

  // Take first 4 categories (or less if not enough categories)
  const selectedCategories = shuffledCategories.slice(0, count);

  // Get one random product from each selected category
  const randomProducts = selectedCategories.map((category) => {
    // Filter products by category
    const productsInCategory = allProducts.filter(
      (product) => product.category === category
    );

    // Get random product from category
    const randomIndex = Math.floor(Math.random() * productsInCategory.length);
    return productsInCategory[randomIndex];
  });

  return randomProducts;
}
