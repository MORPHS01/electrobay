"use client"
import { useStateContext } from "@/contexts/contextprovider";
import Icon from "@/public/svg/svgicons";
import { ProductType } from "@/types/productTypes";
import { toast } from 'react-toastify';

type AddToCartProps = {
  product: ProductType;
  text?: boolean;
  icon?: boolean;
}

function AddToCart({product, text, icon}: AddToCartProps) {
  const { setCartItems } = useStateContext()


  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
    setCartItems(prev => [...prev, product]);
    toast.success("Item has been added to your cart")
  }

  if (text) return (
    <button 
      onClick={(e) => handleClick(e)} 
      className="px-6 py-3 w-fit flex gap-[10px] cursor-pointer tracking-wider rounded-lg active:scale-90 border border-[#2A2B2A44] dark:border-[#4A97DB44]"
    >
      {text && "Add to Cart"} {icon && <Icon name="cart"/>}
    </button>
  )

  if (icon && !text) return (
    <button 
      onClick={(e) => handleClick(e)} 
      className=""
    >
      <Icon name="cart" noHover/>
    </button>
  )
}

export default AddToCart
