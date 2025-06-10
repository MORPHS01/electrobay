"use client";
import { DisplayBlock, ProductCard } from "@/components";
import { getRandomProductsDifferentCategories } from "@/hooks/getRandomProducts";
import Image from "next/image";
import data from "@/data/products.json";
import Icon from "@/public/svg/svgicons";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useTheme } from "next-themes";

const categoriesIcon: {
  label: string;
  iconName:
    | "laptop"
    | "smartPhone"
    | "smartWatch"
    | "television"
    | "gaming"
    | "headPhone"
    | "accessory"
    | "camera";
  href: string;
}[] = [
  { label: "Laptops", iconName: "laptop", href: "laptops" },
  { label: "Smart Phones", iconName: "smartPhone", href: "smart phones" },
  { label: "Smart Watches", iconName: "smartWatch", href: "smart watches" },
  { label: "Televisions", iconName: "television", href: "tv" },
  { label: "Gaming", iconName: "gaming", href: "gaming" },
  { label: "Headphones", iconName: "headPhone", href: "headphones" },
  { label: "Accessories", iconName: "accessory", href: "computer accessories" },
  { label: "Cameras", iconName: "camera", href: "cameras" },
];

const perks: {
  title: string;
  subtitle: string;
  iconName: "truck" | "roundArrow" | "gift" | "support" | "wallet";
}[] = [
  {
    title: "Fast shipping",
    subtitle: "On orders before 13:00",
    iconName: "truck",
  },
  {
    title: "Easy returns",
    subtitle: "Free within 30 days",
    iconName: "roundArrow",
  },
  {
    title: "Special gifts",
    subtitle: "Free with select orders.",
    iconName: "gift",
  },
  {
    title: "Support 24/7",
    subtitle: "Help when you need it",
    iconName: "support",
  },
  { title: "Secured payment", subtitle: "100% safe", iconName: "wallet" },
];

const categories = [
  "cameras",
  "headphones",
  "laptops",
  "smart phones",
  "smart watches",
];

const brandLogos = [
  "samsung",
  "apple",
  "microsoft",
  "lg",
  "sony",
  "hp",
  "lenovo",
];

export default function Home() {
  const hero1 = "bg-[url('/images/hero-image.jpg')]";
  const hero2 = "bg-[url('/images/hero-image2.jpg')]";

  const { theme } = useTheme();

  const randomProducts = getRandomProductsDifferentCategories(data, 4);
  const randomProducts2 = getRandomProductsDifferentCategories(data, 4);
  const getRandomNumber = (): 1 | 2 => {
    return Math.random() < 0.5 ? 1 : 2;
  };

  return (
    <main className="flex min-h-screen flex-col gap-[60px] items-center">
      <section
        className={`w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col items-start justify-center max-sm:justify-end p-[40px] max-sm:p-[15px] max-sm:py-[20%] max-[25rem]:p-[10px] max-[25rem]:py-[10%] relative ${
          getRandomNumber() === 1 ? hero1 : hero2
        }`}
      >
        <div className="absolute inset-0 bg-black/30" />
        <article className="mt-[13%] max-md:mt-[15%] mx-[6%] max-md:mx-0 font-poppins w-[45%] max-lg:w-[60%] max-md:w-full max-md:text-center max-w-[700px] z-[100] mb-[90px] max-[25rem]:mb-[60px]">
          <p className="mb-[16px] font-semibold text-5xl max-sm:text-3xl max-[20rem]:text-xl text-white leading-[120%]">
            Powering Your World, One Gadget at a Time
          </p>
          <p className="mb-[32px] font-normal text-lg max-sm:text-base max-[20rem]:text-sm text-[#b3b3b3]">
            From the latest smartphones to high-performance laptops and beyond —
            explore cutting-edge electronics, handpicked for quality,
            performance, and innovation.
          </p>
          <Link
            href="/categories"
            className="px-8 py-3.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </article>

        <article className="flex flex-wrap gap-3 justify-between shadow-md shadow-black/20 dark:shadow-[#78B1E4]/20 items-center w-[90%] max-sm:w-[95%] mx-auto backdrop-blur-md bg-white/65 dark:bg-[#000022]/65 rounded-lg px-[32px] py-[24px] max-sm:px-[20px] max-[25rem]:px-[16px] max-sm:py-[18px] max-[25rem]:py-[14px] transition-colors duration-300 ease-in-out">
          {categoriesIcon.map((cat, i) => (
            <Link
              href={`/categories/${cat.href}`}
              key={i}
              className="group flex flex-col gap-[5px] items-center font-poppins text-xs text-[#4B4B4B] dark:text-[#d0d0d0] hover:text-blue-600 dark:hover:text-[#51a2ff] max-lg:[&:nth-child(1)]:hidden max-lg:[&:nth-child(5)]:hidden max-md:[&:nth-child(6)]:hidden max-sm:[&:nth-child(7)]:hidden max-sm:[&:nth-child(8)]:hidden cursor-pointer"
            >
              <Icon name={cat.iconName} noHover />
              <p className="text-center">{cat.label}</p>
            </Link>
          ))}
        </article>
      </section>

      <section className="w-[93%] mx-auto flex flex-col gap-[70px] items-center">
        <article className="w-full">
          <DisplayBlock title="Special Offers" link="/categories">
            {randomProducts.map((randomProduct, i) => (
              <ProductCard key={i} product={randomProduct} fixedWidth={true} />
            ))}
          </DisplayBlock>
        </article>

        <article className="my-[20px] w-full px-[23px] py-[33px] rounded-lg border border-[#00001f]/30 dark:border-[#d7d7d7]/30 grid max-[25rem]:grid-cols-1 max-sm:grid-cols-2 max-md:grid-cols-3 max-xl:grid-cols-4 grid-cols-5 max-md:gap-3 gap-5">
          {perks.map((perk, i) => (
            <aside
              key={i}
              className="flex gap-[14px] items-center font-poppins"
            >
              <Icon name={perk.iconName} noHover noPointer />
              <div className="flex flex-col gap-[4px]">
                <p className="text-base max-md:text-sm text-[#424242] dark:text-[#e5e5e5] font-medium">
                  {perk.title}
                </p>
                <p className="text-sm max-md:text-xs text-[#757575] dark:text-[#a1a1a1]">
                  {perk.subtitle}
                </p>
              </div>
            </aside>
          ))}
        </article>

        <article className="w-full">
          <DisplayBlock title="Shop by category" link="/categories">
            <aside className="flex justify-around gap-5 w-full">
              {categories.map((category, i) => (
                <Link
                  key={i}
                  href={`/categories/${category}`}
                  className="group rounded-lg border border-[#00001f]/30 hover:border-[#1A4DE1] dark:border-[#d7d7d7]/30 dark:hover:border-[#78B1E4] min-w-[185px] h-[163px]"
                >
                  <Image
                    src={`/categories/${category}Sprite.png`}
                    alt={category}
                    width={1000}
                    height={1000}
                    className="w-full object-cover object-center"
                  />
                  <p className="capitalize text-[#424242] group-hover:text-[#1A4DE1] dark:text-[#e5e5e5] dark:group-hover:text-[#78B1E4] text-center">
                    {category}
                  </p>
                </Link>
              ))}
            </aside>
          </DisplayBlock>
        </article>

        <article className="w-full">
          <aside className="flex gap-[20px] max-md:flex-col h-[450px] w-full">
            <div className="bg-cover bg-center bg-no-repeat bg-[url('/images/section-image1.jpg')] flex-2 rounded-lg flex items-end h-full relative p-[30px] max-sm:p-[20px]">
              <aside className="absolute inset-0 bg-black/35 rounded-lg" />
              <aside className="flex justify-between items-end w-full z-[10]">
                <div className="flex flex-col gap-[4px] max-w-[300px] flex-1">
                  <p className="font-semibold text-2xl text-white">
                    MacBook Pro
                  </p>
                  <p className="font-normal text-[#b3b3b3]">
                    Now with the Apple M1 chip redefining speed, efficiency, and
                    performance.
                  </p>
                </div>
                <Link
                  href="/categories/laptops/Apple%20MacBook%20Pro%2014%20inches%20M1%20Pro?productInfo=%7B%22productId%22%3A%22P0002%22%2C%22productName%22%3A%22Apple+MacBook+Pro+14+inches+M1+Pro%22%2C%22productDescription%22%3A%22The+Apple+MacBook+Pro+14+inches+M1+Pro+is+a+state-of-the-art+laptops+device+built+by+Apple%2C+offering+top-tier+performance%2C+cutting-edge+features%2C+ergonomic+design%2C+impressive+battery+life%2C+and+seamless+connectivity+to+elevate+your+experience.%22%2C%22category%22%3A%22laptops%22%2C%22productImage%22%3A%22%2Fproducts%2Flaptops%2FAppleMacBookPro14M1Pro.png%22%2C%22productRating%22%3A3.5%2C%22productPrice%22%3A1794000%7D"
                  className="px-7 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Buy now
                </Link>
              </aside>
            </div>

            <div className="bg-cover bg-center bg-no-repeat bg-[url('/images/section-image2.jpg')] flex-1 max-md:flex-2 rounded-lg flex items-end h-full relative p-[30px] max-sm:p-[20px]">
              <aside className="absolute inset-0 bg-black/40 rounded-lg" />
              <aside className="flex justify-between items-end w-full z-[10]">
                <div className="flex flex-col gap-[4px] max-w-[300px] flex-1">
                  <p className="font-semibold text-2xl text-white">
                    Samsung Galaxy Z Flip 6
                  </p>
                  <p className="font-normal text-[#b3b3b3]">
                    Discover the future of foldable phones with the Galaxy Z
                    Flip 6—sleek design, powerful performance, and innovative
                    features.
                  </p>
                </div>
                <Link
                  href="/categories/smart%20phones/Samsung%20Galaxy%20Z%20Flip%206?productInfo=%7B%22productId%22%3A%22P0044%22%2C%22productName%22%3A%22Samsung+Galaxy+Z+Flip+6%22%2C%22productDescription%22%3A%22The+Samsung+Galaxy+Z+Flip+6+is+a+state-of-the-art+smart+phones+device+built+by+Samsung%2C+offering+top-tier+performance%2C+cutting-edge+features%2C+ergonomic+design%2C+impressive+battery+life%2C+and+seamless+connectivity+to+elevate+your+experience.%22%2C%22category%22%3A%22smart+phones%22%2C%22productImage%22%3A%22%2Fproducts%2Fsmartphones%2FSamsung+Galaxy+Z+Flip+6.png%22%2C%22productRating%22%3A3.6%2C%22productPrice%22%3A1197000%7D"
                  className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Buy now
                </Link>
              </aside>
            </div>
          </aside>
        </article>

        <article className="w-full">
          <DisplayBlock title="Best Seller" link="/categories">
            {randomProducts2.map((randomProduct2, i) => (
              <ProductCard key={i} product={randomProduct2} fixedWidth={true} />
            ))}
          </DisplayBlock>
        </article>

        <article className="w-full">
          <DisplayBlock title="Top Brands" noViewAll>
            <Marquee
              direction="left"
              gradient={true}
              gradientWidth="12%"
              gradientColor={theme === "light" ? "#EEF6FC" : "#000319"}
            >
              <aside className="flex items-center gap-[55px]">
                {brandLogos.map((logo, i) => (
                  <Image
                    key={i}
                    src={`/svg/${logo}.svg`}
                    alt={logo}
                    width={100}
                    height={100}
                    className="object-center object-cover last:mr-[55px]"
                  />
                ))}
              </aside>
            </Marquee>
          </DisplayBlock>
        </article>
      </section>
    </main>
  );
}
