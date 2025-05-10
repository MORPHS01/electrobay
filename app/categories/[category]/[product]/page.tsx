"use client"
import { useEffect } from 'react';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation'

function Product() {
  const searchParams = useSearchParams();
  const StringifiedProduct = searchParams.get("productInfo");
  const product = StringifiedProduct ? JSON.parse(StringifiedProduct) : redirect("/categories");

  useEffect(() => {
    if (!StringifiedProduct) {
      redirect("/categories");
    }
  }, [StringifiedProduct]);


  return (
    <main>
      <div>{product.productId}</div>
      <div>{product.productName}</div>
      <div>{product.productDescription}</div>
      <div>{product.category}</div>
      <Image src={product.productImage} alt={product.productName} width={1000} height={1000} className="w-[200px]"/>
      <div>{product.productRating}</div>
      <div><span className="mr-[2px]">₦</span>{product.productPrice.toLocaleString('en-US')}</div>
    </main>
  )
}

export default Product


