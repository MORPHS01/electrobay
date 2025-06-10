"use client";
import { ProductType } from "@/types/productTypes";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import AddToWishList from "./addToButtons/addtowishlist";
import AddToCart from "./addToButtons/addtocart";
import Icon from "@/public/svg/svgicons";

type ProductCardProps = {
  product: ProductType;
  fixedWidth?: boolean;
};

export default function ProductCard({
  product,
  fixedWidth = false,
}: ProductCardProps) {
  return (
    <Link
      href={{
        pathname: `/categories/${product.category}/${product.productName}`,
        query: { productInfo: JSON.stringify(product) },
      }}
      className={`group ${fixedWidth && "max-w-[500px] min-w-[250px] max-sm:"}`}
    >
      <div className="bg-white dark:bg-[#0F1125] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-103">
        <div className="relative h-48 max-sm:h-30 p-5 max-sm:p-2 w-full bg-[#efefef] dark:bg-[#1b2048]">
          <Image
            src={product.productImage}
            alt={product.productName}
            width={1000}
            height={1000}
            className="object-contain h-full"
          />
          <div className="absolute bottom-0 right-0">
            <AddToWishList product={product} productCard icon />
          </div>
        </div>
        <div className="p-4 max-sm:p-1">
          <h2 className="text-lg max-sm:text-base font-medium mb-2 max-sm:mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
            {product.productName}
          </h2>
          <p className="max-sm:text-sm text-gray-600 dark:text-gray-400 text-sm mb-2 max-sm:mb-1 capitalize">
            {product.category}
          </p>
          <p className="text-lg max-sm:text-base font-semibold">
            <span className="mr-[3px] font-poppins ">₦</span>
            {product.productPrice.toLocaleString()}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex mt-2">
              {Array.from(
                { length: Math.trunc(product.productRating) },
                (_, index) => (
                  <Icon key={index} name="star" noPointer noHover />
                )
              )}{" "}
              {product.productRating - Math.trunc(product.productRating) >
                0.5 && <Icon name="halfStar" noPointer noHover />}
            </div>
            <AddToCart product={product} icon />
          </div>
        </div>
      </div>
    </Link>
  );
}
