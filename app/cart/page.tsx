"use client"
import { useStateContext } from "@/contexts/contextprovider"
import Link from "next/link"
import Image from "next/image";
import Icon from "@/public/svg/svgicons";

function Cart() {
  const { cartItems, setCartItems } = useStateContext();

  

  return (
    <main>
      <button onClick={() => setCartItems([])}>Clear All</button>
      { cartItems.length > 0 ? (
          cartItems.map((result, i) => (
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
          ))
        ):(
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              You currently have no items in your cart
            </p>
            <Link 
              href="/categories"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>  
      )}
    </main>
  )
}

export default Cart  