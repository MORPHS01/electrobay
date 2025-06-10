"use client";
import { useStateContext } from "@/contexts/contextprovider";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/public/svg/svgicons";
import { AddToCart, AddToWishList } from "@/components";
import Button from "@/components/utility/button";
import { useEffect } from "react";

function Cart() {
  const { cartItems, setCartItems } = useStateContext();

  // Add null check and ensure cartItems is an array
  const items = Array.isArray(cartItems) ? cartItems : [];

  const subTotal = items.reduce(
    (sum, item) => sum + item.productPrice * (item.quantity ?? 1),
    0
  );
  const shippingFee = Math.trunc(subTotal / 65);
  const total = subTotal + shippingFee;

  // This is for the bottom fixed buttons on mobile view
  useEffect(() => {
    const bottomFixed = document.getElementById("bottomFixed");

    if (bottomFixed) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;

        if (pageHeight - scrollPosition <= 350) {
          bottomFixed.style.display = "none";
        } else {
          bottomFixed.style.display = "block";
        }
      });

      // Cleanup function to remove listeners when the component unmounts
      return () => {
        window.removeEventListener("scroll", () => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const pageHeight = document.documentElement.scrollHeight;

          if (pageHeight - scrollPosition <= 350) {
            bottomFixed.style.display = "none";
          } else {
            bottomFixed.style.display = "block";
          }
        });
      };
    }
  }, []);

  return (
    <main className="py-6">
      <section className="flex max-md:flex-col-reverse justify-between gap-[6%] max-lg:gap-[3%] w-full">
        {/* cartItems List */}
        <aside className="flex justify-center flex-1">
          {items.length > 0 ? (
            <div className="flex flex-col gap-5">
              {items.map((cartItem, i) => (
                <Link
                  key={i}
                  href={{
                    pathname: `/categories/${cartItem.category}/${cartItem.productName}`,
                    query: { productInfo: JSON.stringify(cartItem) },
                  }}
                  className="group flex items-center gap-8 p-[24px] h-[220px] bg-white dark:bg-[#0F1125] rounded-lg border border-[#E5E5E5] dark:border-[#181C3A]"
                >
                  <div className="w-[27%] max-md:w-[30%] h-full">
                    <Image
                      src={cartItem.productImage}
                      alt={cartItem.productName}
                      width={1000}
                      height={1000}
                      className="object-contain h-full"
                    />
                  </div>

                  <div className="flex flex-col h-full justify-between flex-1">
                    <span className="flex flex-col gap-[1px]">
                      <h1 className="font-semiboldtext-xl max-md:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {cartItem.productName}
                      </h1>
                      <p className="line-clamp-1 max-md:line-clamp-2 text-gray-600 dark:text-gray-400 text-sm">
                        {cartItem.productDescription}
                      </p>
                    </span>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 font-poppins">
                      <span className="mr-[3px]">₦</span>
                      {cartItem.productPrice.toLocaleString()}
                    </p>
                    <span className="flex justify-between">
                      <AddToCart product={cartItem} icon />
                      <div className="flex items-center gap-3 max-sm:gap-1">
                        <AddToWishList product={cartItem} icon />
                        <span className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <Icon
                            name="trash"
                            noHover
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setCartItems((prev) =>
                                prev.filter(
                                  (item) =>
                                    item.productId !== cartItem.productId
                                )
                              );
                            }}
                          />
                        </span>
                      </div>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center">
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
        </aside>

        {/* Info List Desktop */}
        {items.length > 0 && (
          <aside className="w-[30%] max-lg:w-[35%] max-md:hidden h-fit sticky top-[200px]">
            <div className="px-[24px] py-[48px] w-full flex flex-col gap-[16px] bg-white dark:bg-[#0F1125] rounded-lg border border-[#E5E5E5] dark:border-[#181C3A]">
              <span className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-poppins">
                  <span className="mr-[3px]">₦</span>
                  {subTotal.toLocaleString()}
                </p>
              </span>
              <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

              <span className="flex justify-between">
                <p>Shipping Fee</p>
                <p className="font-poppins">
                  <span className="mr-[3px]">₦</span>
                  {shippingFee.toLocaleString()}
                </p>
              </span>
              <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

              <span className="flex justify-between">
                <p>Discount</p>
                <p className="font-poppins">N/A</p>
              </span>
              <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

              <span className="flex justify-between">
                <p>Total</p>
                <p className="font-poppins">
                  <span className="mr-[3px]">₦</span>
                  {total.toLocaleString()}
                </p>
              </span>

              <Link
                href={{
                  pathname: "/check-out",
                  query: { totalAmount: subTotal, shippingFee: shippingFee },
                }}
                className="mt-8 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                Proceed to Checkout
              </Link>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                type="fill"
                bgColor="#FF0000"
                bgHover="#FF4747"
                scaleOnHover={false}
                onClick={() => setCartItems([])}
              >
                Clear All
              </Button>
            </div>
          </aside>
        )}

        {/* Info List Mobile */}
        {items.length > 0 && (
          <aside className="hidden max-md:block w-full mb-10">
            <div className="px-[20px] py-[20px] w-full flex flex-col gap-[13px] bg-white dark:bg-[#0F1125] rounded-lg border border-[#E5E5E5] dark:border-[#181C3A]">
              <span>
                <h1 className="font-poppins font-semibold text-lg mb-2 text-center">
                  CART SUMMARY
                </h1>
                <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />
              </span>

              <span className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-poppins">
                  <span className="mr-[3px]">₦</span>
                  {subTotal.toLocaleString()}
                </p>
              </span>
              <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

              <span className="flex justify-between">
                <p>Shipping Fee</p>
                <p className="font-poppins">
                  <span className="mr-[3px]">₦</span>
                  {shippingFee.toLocaleString()}
                </p>
              </span>
              <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

              <span className="flex justify-between">
                <p>Discount</p>
                <p>N/A</p>
              </span>
              <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A]" />

              <span className="flex justify-between">
                <p>Total</p>
                <p className="font-poppins">
                  <span className="mr-[3px]">₦</span>
                  {total.toLocaleString()}
                </p>
              </span>

              {/* Fixed buttons on bottom mobile */}
              <article
                id="bottomFixed"
                className="fixed z-[1000] bottom-0 left-0 w-full px-[10%] py-5 bg-white dark:bg-[#0F1125] rounded-t-3xl border border-[#E5E5E5] dark:border-[#181C3A]"
              >
                <section className="flex justify-between items-center h-full ">
                  <Link
                    href={{
                      pathname: "/check-out",
                      query: {
                        totalAmount: subTotal,
                        shippingFee: shippingFee,
                      },
                    }}
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
                  >
                    Proceed to Checkout{" "}
                    <span className="font-semibold font-poppins">
                      <span className="ml-[5px] mr-[3px]">₦</span>
                      {total.toLocaleString()}
                    </span>
                  </Link>

                  <Button
                    type="fill"
                    bgColor="#FF0000"
                    bgHover="#FF4747"
                    scaleOnHover={false}
                    onClick={() => setCartItems([])}
                  >
                    Clear All
                  </Button>
                </section>
              </article>
            </div>
          </aside>
        )}
      </section>
    </main>
  );
}

export default Cart;
