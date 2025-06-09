"use client";
import { useStateContext } from "@/contexts/contextprovider";
import Icon from "@/public/svg/svgicons";
import { ProductType } from "@/types/productTypes";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

type AddToCartProps = {
  product: ProductType;
  text?: boolean;
  icon?: boolean;
  className?: string;
  buttonHover?: boolean;
};

function AddToCart({
  product,
  text,
  icon,
  className,
  buttonHover = true,
}: AddToCartProps) {
  const { cartItems, setCartItems } = useStateContext();
  const [quantity, setQuantity] = useState(0);

  // Check if item is in cart and update quantity
  useEffect(() => {
    const itemInCart = cartItems.find(
      (item) => item.productId === product.productId
    );
    if (itemInCart) {
      setQuantity(itemInCart.quantity || 0);
    }
  }, [cartItems, product.productId]);

  function updateQuantity(newQuantity: number) {
    if (newQuantity < 0) return;

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.productId
      );

      if (newQuantity === 0) {
        // Remove item from cart
        return prevItems.filter((item) => item.productId !== product.productId);
      }

      if (existingItemIndex !== -1) {
        // Update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...prevItems[existingItemIndex],
          quantity: newQuantity,
        };
        return updatedItems;
      }

      // Add new item
      return [...prevItems, { ...product, quantity: newQuantity }];
    });

    setQuantity(newQuantity);
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    updateQuantity(quantity + 1);
    toast.success("Item has been added to your cart");
  }

  // Show quantity controls if item is in cart
  if (quantity > 0) {
    return (
      <div
        className={`${twMerge(
          "flex justify-between items-center gap-2 bg-white dark:bg-[#0F1125] rounded-lg border border-[#2A2B2A44] dark:border-[#4A97DB44]",
          className
        )}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            updateQuantity(quantity - 1);
          }}
          className={`${
            buttonHover
              ? "hover:bg-gray-100 dark:hover:bg-[#1d2047]"
              : "hover:bg-transparent dark:hover:bg-transparent"
          } px-2.5 py-1.5 rounded-l-lg transition-colors cursor-pointer`}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => updateQuantity(parseInt(e.target.value) || 0)}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="no-spinner w-10 text-center bg-transparent outline-none"
          min="0"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            updateQuantity(quantity + 1);
          }}
          className={`${
            buttonHover
              ? "hover:bg-gray-100 dark:hover:bg-[#1d2047]"
              : "hover:bg-transparent dark:hover:bg-transparent"
          } px-2.5 py-1.5 rounded-l-lg transition-colors cursor-pointer`}
        >
          +
        </button>
      </div>
    );
  }

  // Default Add to Cart button
  if (text)
    return (
      <button
        onClick={handleClick}
        className={`${twMerge(
          "px-6 py-3 w-fit flex justify-center gap-[10px] cursor-pointer tracking-wider rounded-lg active:scale-90 border border-[#2A2B2A44] dark:border-[#4A97DB44]",
          className
        )}`}
      >
        {text && "Add to Cart"} {icon && <Icon name="cart" />}
      </button>
    );

  if (icon && !text)
    return (
      <button
        onClick={handleClick}
        className={`${twMerge(
          "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
          className
        )}`}
      >
        <Icon name="cart" noHover />
      </button>
    );

  return null;
}

export default AddToCart;
