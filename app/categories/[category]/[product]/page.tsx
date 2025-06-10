"use client";
import { Suspense, useEffect } from "react";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import Button from "@/components/utility/button";
import {
  AddToCart,
  AddToWishList,
  DescriptionDropDown,
  DisplayBlock,
  Loading,
  ProductCard,
} from "@/components";
import Link from "next/link";
import { getRandomProductsSameCategory } from "@/hooks/getRandomProducts";
import data from "@/data/products.json";

const priorities = [
  "Order before 13:00 for same-day dispatch",
  "Easy returns: return within 30 days if you're not satisfied",
  "2-year warranty: peace of mind for your purchase",
];

const informationList = [
  "This electronic device features a sleek design that fits seamlessly into any modern living space.",
  "Equipped with advanced connectivity options, it supports Wi-Fi, Bluetooth, and multiple USB ports for convenience.",
  "The device operates efficiently on both AC power and battery, ensuring uninterrupted performance during power outages.",
  "Its intuitive user interface allows for easy navigation and quick access to all essential functions and settings.",
  "With a robust build quality, the device is designed to withstand daily use and accidental drops or impacts.",
  "A comprehensive warranty of two years is included, providing peace of mind for your investment.",
  "The package contains essential accessories such as a user manual, power cable, and a warranty card for support.",
  "Energy-efficient technology ensures minimal power consumption, making it an environmentally friendly choice for users.",
];

const specificationList = [
  ["Brand", "ElectroBay"],
  ["Model", "EB-2024"],
  ["Power", "50W"],
  ["Connectivity", "Wi-Fi, Bluetooth, USB"],
  ["Warranty", "2 years"],
  ["Dimensions", "250 x 150 x 40 mm"],
  ["Color", "Black"],
  ["Weight", "1.2 kg"],
  ["Input Voltage", "100-240V AC"],
];

function ProductContent() {
  const searchParams = useSearchParams();
  const StringifiedProduct = searchParams.get("productInfo");
  const product = StringifiedProduct
    ? JSON.parse(StringifiedProduct)
    : redirect("/categories");

  const similarProducts = getRandomProductsSameCategory(data, product);
  useEffect(() => {
    if (!StringifiedProduct) {
      redirect("/categories");
    }
  }, [StringifiedProduct]);

  return (
    <main>
      <article className="flex max-md:flex-col items-center justify-between gap-[60px] pt-[40px] mb-[60px]">
        <section className="w-[54%] max-lg:w-[40%] max-md:w-[100%]">
          <Image
            src={product.productImage}
            alt={product.productName}
            width={1000}
            height={1000}
            className="w-[400px] max-h-[400px] object-contain mx-auto"
          />
        </section>
        <section className="flex-1 max-md:w-full">
          <h1 className="text-[#4B4B4B] dark:text-[#E5E5E5] text-3xl font-semibold mb-[8px]">
            {product.productName}
          </h1>
          <span className="flex gap-1 items-center text-sm text-[#2b2b2b] dark:text-[#F4F9FD] mb-[30px]">
            <Star />
            <p>{product.productRating}</p>
            <p>({(Math.random() * 1000).toFixed(0)})</p>
          </span>
          <div className="text-3xl font-semibold text-blue-600 dark:text-blue-400 tracking-wide mb-[8px] font-poppins">
            <span className="mr-[2px]">₦</span>
            {product.productPrice.toLocaleString("en-US")}
          </div>
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-[50px]">
            Delivered Tomorrow
          </p>
          <div className="flex gap-[8px] h-[50px] mb-[30px]">
            <Link
              className="flex-1 h-full"
              href={{
                pathname: "/check-out",
                query: { totalAmount: product.productPrice },
              }}
            >
              <Button
                type="fill"
                bgColor="#1A4DE1"
                bgHover="#4A97DB"
                className="w-full h-full"
                scaleOnHover={false}
              >
                Buy now
              </Button>
            </Link>
            <AddToCart
              product={product}
              text
              buttonHover={false}
              className="active:scale-100 hover:bg-transparent dark:hover:bg-transparent bg-transparent dark:bg-transparent border border-[#1A4DE1] dark:border-[#78B1E4] text-[#1A4DE1] dark:text-[#78B1E4] flex-1 px-[4px]"
            />
            <AddToWishList
              product={product}
              icon
              className="hover:bg-transparent dark:hover:bg-transparent px-[14px] border border-[#1A4DE1] dark:border-[#78B1E4] rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            {priorities.map((priority, i) => (
              <span key={i} className="flex items-center gap-[8px]">
                <Check />
                <p className="text-sm font-medium">{priority}</p>
              </span>
            ))}
          </div>
        </section>
      </article>

      <article className="flex flex-col gap-[40px]">
        <DescriptionDropDown
          openByDefault
          header="Information & Specifications"
        >
          <aside className="flex max-md:flex-col items-start gap-[10%]">
            <ul className="flex-1 list-disc list-outside ps-5 flex flex-col gap-[20px] max-md:gap-[15px]">
              {informationList.map((info, i) => (
                <li key={i}>{info}</li>
              ))}
            </ul>

            <div className="w-[40%] max-md:w-full max-md:mt-[30px]">
              {specificationList.map(([label, value], i) => (
                <aside
                  key={label}
                  className="grid grid-cols-2 gap-[3px] gap-y-0 h-full items-center"
                >
                  <div
                    className={`px-[12px] py-[16px] rounded-l-md ${
                      i % 2 === 0 && "bg-[#F3F3F3] dark:bg-[#161E3A]"
                    }`}
                  >
                    {label}
                  </div>
                  <div
                    className={`px-[12px] py-[16px] rounded-r-md ${
                      i % 2 === 0 && "bg-[#F3F3F3] dark:bg-[#161E3A]"
                    }`}
                  >
                    {value}
                  </div>
                </aside>
              ))}
            </div>
          </aside>
        </DescriptionDropDown>

        <DescriptionDropDown header="Product description">
          {product.productDescription}
        </DescriptionDropDown>

        <DescriptionDropDown header="User ratings and reviews">
          <aside className="flex gap-[24px] max-md:flex-col">
            {/* Review Summary Card */}
            <div className="flex-1 border border-[#AEAEAE] dark:border-[#F4F9FD66] rounded-md p-6 bg-transparent flex flex-col items-center min-w-[300px] ">
              <h3 className="text-2xl max-md:text-lg font-semibold mb-[24px] text-center">
                Customer reviews
              </h3>
              <div className="flex items-center gap-[4px] mb-[48px]">
                {[...Array(5)].map((_, i) => (
                  <BigStar key={i} />
                ))}
              </div>
              <div className="w-full flex flex-col gap-[20px] mb-[24px]">
                {/* Star breakdown */}
                {[
                  { star: 5, percent: 75 },
                  { star: 4, percent: 30 },
                  { star: 3, percent: 22 },
                  { star: 2, percent: 41 },
                  { star: 1, percent: 12 },
                ].map(({ star, percent }) => (
                  <div key={star} className="flex items-center gap-4">
                    <span className="text-xs w-6 flex gap-[3px]">
                      {star} <span>star</span>
                    </span>
                    <div className="flex-1 h-[12px] bg-gray-200 dark:bg-gray-800 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="text-xs text-right">{percent}%</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-center mb-[24px]">
                Share your feedback and create a better shopping experience for
                everyone.
                <br />
                Thank you for taking the time to share your opinion.
              </p>
              <Button
                type="fill"
                bgColor="#1A4DE1"
                bgHover="#155dfc"
                className="w-full"
                scaleOnHover={false}
              >
                Write a review
              </Button>
            </div>

            {/* Individual Reviews */}
            <div className="flex flex-col gap-[24px] flex-2">
              {/* Review 1 */}
              <div className="border border-[#AEAEAE] dark:border-[#F4F9FD66] rounded-md p-6 bg-transparent">
                <aside className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} />
                    ))}
                    <span className="font-semibold text-sm ml-1">4.20</span>
                  </div>

                  <div className="flex gap-[40px] items-center text-xs text-gray-500">
                    <span>12 days ago</span>
                    <span className="font-medium">Nancy Bell</span>
                  </div>
                </aside>
                <p className="mb-[30px]">
                  Amazing performance! The Intel Core i7 processor is blazing
                  fast, and the laptop handles all my work-related tasks
                  effortlessly. The battery life is decent, and the build
                  quality feels premium. Highly recommend for professionals!
                </p>
                <ul className="text-sm mb-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>+ Fast Core I5 processor</li>
                  <li>+ Webcam can be blocked with built-in slider</li>
                  <li>- Speaker sound is moderate but adequate</li>
                </ul>

                <div className="flex justify-end gap-4 mt-3">
                  <button className="flex items-center gap-1 cursor-pointer">
                    <Thumb direction="down" />
                    10
                  </button>
                  <button className="flex items-center gap-1 cursor-pointer">
                    <Thumb direction="up" />
                    25
                  </button>
                </div>
              </div>
              {/* Review 2 */}
              <div className="border border-[#AEAEAE] dark:border-[#F4F9FD66] rounded-md p-6 bg-transparent">
                <aside className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-[2px]">
                    {[...Array(3)].map((_, i) => (
                      <Star key={i} />
                    ))}
                    <span className="font-semibold text-sm ml-1">3.87</span>
                  </div>

                  <div className="flex gap-[40px] items-center text-xs text-gray-500">
                    <span>8 days ago</span>
                    <span className="font-medium">Mark Tony</span>
                  </div>
                </aside>
                <p className="mb-[30px]">
                  It is a practical laptop for not too heavy tasks. I do not
                  game with it but purely for browsing, emailing, reading car
                  and communication programs for my hobby. I come from an Acer
                  myself and there you could leave the keyboard lighting on.
                </p>
                <ul className="text-sm mb-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                  <li>
                    + I connect up to 2 external screens for a good overview
                  </li>
                  <li>+ Fits easily on small surfaces</li>
                  <li>- Poor keyboard contrast</li>
                </ul>

                <div className="flex justify-end gap-4 mt-3">
                  <button className="flex items-center gap-1 cursor-pointer">
                    <Thumb direction="down" />3
                  </button>
                  <button className="flex items-center gap-1 cursor-pointer">
                    <Thumb direction="up" />
                    16
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </DescriptionDropDown>

        <aside className="bg-gradient-to-br from-[#A0B3F8] to-[#A978D6] relative h-[330px] my-[50px]">
          <Image
            src="/images/cover-image.png"
            alt="cover-image"
            fill
            className="absolute inset-0 object-center object-cover"
          />

          <div className="absolute right-[5%] max-md:left-1/2 max-md:-translate-x-1/2 top-1/2 -translate-y-1/2 w-[250px]">
            <p className="text-white text-2xl font-semibold text-center mb-[24px]">
              Your next favorite find is just a click away!
            </p>
            <Link
              className="flex justify-center"
              href={`/categories/${product.category}`}
            >
              <Button
                type="fill"
                bgColor="#1A4DE1"
                bgHover="#155dfc"
                className="w-[80%]"
                scaleOnHover={false}
              >
                View all
              </Button>
            </Link>
          </div>
        </aside>

        <DisplayBlock
          title="Similar picks for you"
          link={`/categories/${product.category}`}
        >
          {similarProducts.map((similarProduct, i) => (
            <ProductCard key={i} product={similarProduct} fixedWidth={true} />
          ))}
        </DisplayBlock>
      </article>
    </main>
  );
}

export default function Product() {
  return (
    <main className="py-3">
      <Suspense fallback={<Loading />}>
        <ProductContent />
      </Suspense>
    </main>
  );
}

function Check() {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 22.75C6.57 22.75 1.75 17.93 1.75 12C1.75 6.07 6.57 1.25 12.5 1.25C18.43 1.25 23.25 6.07 23.25 12C23.25 17.93 18.43 22.75 12.5 22.75ZM12.5 2.75C7.4 2.75 3.25 6.9 3.25 12C3.25 17.1 7.4 21.25 12.5 21.25C17.6 21.25 21.75 17.1 21.75 12C21.75 6.9 17.6 2.75 12.5 2.75Z"
        fill="#1FC16B"
      />
      <path
        d="M11.0799 15.5816C10.8799 15.5816 10.6899 15.5016 10.5499 15.3616L7.71994 12.5316C7.42994 12.2416 7.42994 11.7616 7.71994 11.4716C8.00994 11.1816 8.48994 11.1816 8.77994 11.4716L11.0799 13.7716L16.2199 8.63156C16.5099 8.34156 16.9899 8.34156 17.2799 8.63156C17.5699 8.92156 17.5699 9.40156 17.2799 9.69156L11.6099 15.3616C11.4699 15.5016 11.2799 15.5816 11.0799 15.5816Z"
        fill="#1FC16B"
      />
    </svg>
  );
}

function Star() {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      className="fill-[#2b2b2b] dark:fill-[#F4F9FD]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.02772 0.858695C6.18337 0.410914 6.81663 0.410914 6.97228 0.858694L8.03156 3.90611C8.10023 4.10364 8.28457 4.23758 8.49366 4.24184L11.7193 4.30757C12.1932 4.31723 12.3889 4.9195 12.0111 5.20591L9.44022 7.15505C9.27357 7.28139 9.20315 7.4981 9.26371 7.69827L10.198 10.7863C10.3352 11.2401 9.82291 11.6123 9.43379 11.3415L6.78559 9.49873C6.61393 9.37928 6.38607 9.37928 6.21441 9.49873L3.56621 11.3415C3.17709 11.6123 2.66476 11.2401 2.80204 10.7863L3.73629 7.69827C3.79685 7.4981 3.72643 7.28139 3.55979 7.15505L0.988857 5.20591C0.61109 4.91951 0.80678 4.31723 1.28074 4.30757L4.50634 4.24184C4.71543 4.23758 4.89977 4.10365 4.96844 3.90611L6.02772 0.858695Z" />
    </svg>
  );
}

function BigStar() {
  return (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      className="fill-[#2b2b2b] dark:fill-[#F4F9FD]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.0277 1.85869C12.1834 1.41091 12.8166 1.41091 12.9723 1.85869L15.3247 8.62627C15.3934 8.82381 15.5777 8.95774 15.7868 8.962L22.9501 9.10798C23.424 9.11764 23.6197 9.71991 23.242 10.0063L17.5325 14.3349C17.3659 14.4612 17.2955 14.6779 17.356 14.8781L19.4308 21.7359C19.5681 22.1897 19.0557 22.5619 18.6666 22.2911L12.7856 18.1987C12.6139 18.0793 12.3861 18.0793 12.2144 18.1987L6.33339 22.2911C5.94427 22.5619 5.43194 22.1897 5.56922 21.7359L7.64396 14.8781C7.70452 14.6779 7.63411 14.4612 7.46746 14.3349L1.75804 10.0063C1.38028 9.71991 1.57597 9.11764 2.04993 9.10798L9.21321 8.962C9.4223 8.95774 9.60665 8.82381 9.67531 8.62627L12.0277 1.85869Z" />
    </svg>
  );
}

function Thumb({ direction = "up" }: { direction?: "up" | "down" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        direction === "up" ? "" : "rotate-180"
      }  fill-[#1744C8] dark:fill-[#78B1E4]`}
    >
      <path d="M16.2801 22.1005H12.4801C11.9201 22.1005 10.7001 21.9305 10.0501 21.2805L7.02011 18.9405L7.94011 17.7505L11.0401 20.1505C11.2901 20.3905 11.9201 20.5905 12.4801 20.5905H16.2801C17.1801 20.5905 18.1501 19.8705 18.3501 19.0605L20.7701 11.7105C20.9301 11.2705 20.9001 10.8705 20.6901 10.5805C20.4701 10.2705 20.0701 10.0905 19.5801 10.0905H15.5801C15.0601 10.0905 14.5801 9.87048 14.2501 9.49048C13.9101 9.10048 13.7601 8.58048 13.8401 8.04048L14.3401 4.83048C14.4601 4.27048 14.0801 3.64048 13.5401 3.46048C13.0501 3.28048 12.4201 3.54048 12.2001 3.86048L8.10011 9.96048L6.86011 9.13048L10.9601 3.03048C11.5901 2.09048 12.9701 1.64048 14.0501 2.05048C15.3001 2.46048 16.1001 3.84048 15.8201 5.12048L15.3301 8.27048C15.3201 8.34048 15.3201 8.44048 15.3901 8.52048C15.4401 8.57048 15.5101 8.60048 15.5901 8.60048H19.5901C20.5701 8.60048 21.4201 9.01048 21.9201 9.72048C22.4101 10.4105 22.5101 11.3205 22.1901 12.2005L19.8001 19.4805C19.4301 20.9305 17.8901 22.1005 16.2801 22.1005Z" />
      <path d="M5.37988 20.9984H4.37988C2.52988 20.9984 1.62988 20.1284 1.62988 18.3484V8.54844C1.62988 6.76844 2.52988 5.89844 4.37988 5.89844H5.37988C7.22988 5.89844 8.12988 6.76844 8.12988 8.54844V18.3484C8.12988 20.1284 7.22988 20.9984 5.37988 20.9984ZM4.37988 7.39844C3.28988 7.39844 3.12988 7.65844 3.12988 8.54844V18.3484C3.12988 19.2384 3.28988 19.4984 4.37988 19.4984H5.37988C6.46988 19.4984 6.62988 19.2384 6.62988 18.3484V8.54844C6.62988 7.65844 6.46988 7.39844 5.37988 7.39844H4.37988Z" />
    </svg>
  );
}
