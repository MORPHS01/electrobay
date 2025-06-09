"use client";
import { useStateContext } from "@/contexts/contextprovider";
import { ProductType } from "@/types/productTypes";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

type AddToWishListProps = {
  product: ProductType;
  productCard?: boolean;
  text?: boolean;
  icon?: boolean;
  className?: string;
};

function AddToWishList({
  product,
  productCard = false,
  text,
  icon,
  className,
}: AddToWishListProps) {
  const { wishListItems, setWishListItems } = useStateContext();
  const itemInWishList = wishListItems.find(
    (item) => item.productId === product.productId
  );

  function addItems() {
    if (itemInWishList) {
      setWishListItems((prev) =>
        prev.filter((item) => item.productId !== product.productId)
      );
    } else {
      setWishListItems((prev) => [...prev, product]);
    }
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    addItems();
    if (itemInWishList) {
      toast.success("Item has been removed from your Wishlist");
    } else {
      toast.success("Item has been added to your Wishlist");
    }
  }

  // Default Add to WishList button
  if (text)
    return (
      <button
        onClick={handleClick}
        className={`${twMerge(
          "cursor-pointer px-6 py-3 w-fit flex gap-[10px] tracking-wider rounded-lg active:scale-90 border border-[#2A2B2A44] dark:border-[#4A97DB44]",
          className
        )}`}
      >
        {text && "Add to WishList"}{" "}
        {icon && (itemInWishList !== undefined ? <HeartFilled /> : <Heart />)}
      </button>
    );

  if (icon && !text)
    return (
      <button
        onClick={handleClick}
        className={`${twMerge(
          "cursor-pointer p-2 rounded-full transition-colors",
          productCard
            ? "m-2 bg-[#ADADAD]/50 dark:bg-[#2D75B4]/30 backdrop-blur-lg hover:bg-[#ADADAD]/90 dark:hover:bg-[#2D75B4]/90"
            : "hover:bg-gray-100 dark:hover:bg-gray-800",
          className
        )}`}
      >
        {itemInWishList !== undefined ? <HeartFilled /> : <Heart />}
      </button>
    );

  return null;
}

export default AddToWishList;

const Heart = () => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="20px"
    height="20px"
    viewBox="0 0 1.6 1.6"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
  >
    <path
      fill="none"
      className="stroke-[#4B4B4B] dark:stroke-[#DDECF8]"
      strokeWidth={0.1}
      strokeMiterlimit={10}
      d="M0.025 0.525c0 0.5 0.775 0.95 0.775 0.95s0.775 -0.45 0.775 -0.95c0 -0.207 -0.15 -0.4 -0.375 -0.4 -0.207 0 -0.4 0.143 -0.4 0.35 0 -0.207 -0.193 -0.35 -0.4 -0.35C0.175 0.125 0.025 0.318 0.025 0.525z"
    />
  </svg>
);

const HeartFilled = () => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 0.375 0.375"
    id="heart"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-red-600 dark:fill-blue-300"
  >
    <path d="M0.348 0.169c-0.029 0.056 -0.107 0.133 -0.152 0.174a0.013 0.013 0 0 1 -0.017 0C0.135 0.302 0.056 0.225 0.027 0.169 -0.037 0.045 0.125 -0.038 0.188 0.086c0.063 -0.124 0.225 -0.041 0.16 0.083" />
  </svg>
);
