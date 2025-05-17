"use client"
import { useStateContext } from '@/contexts/contextprovider';
import Icon from '@/public/svg/svgicons';
import Link from 'next/link';
import Image from 'next/image';
import AddToCart from '../utility/addToButtons/addtocart';
import Button from '../utility/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


function WishListModal() {
  const {isWishListOpen, setIsWishListOpen, wishListItems, setWishListItems, cartItems, setCartItems} = useStateContext();
  const router = useRouter()

  function handleTransfer() {
    const newCartItems = wishListItems.filter(wishlistItem => !cartItems.some(cartItem => cartItem.productId === wishlistItem.productId))
      .map(item => ({
        ...item,
        quantity: 1
      }));
    
    if (newCartItems.length === 0) {
      toast.info("All items are already in your cart");
      return;
    }

    setCartItems([...cartItems, ...newCartItems]);
    router.push("/cart");
    setIsWishListOpen(false);
    toast.success(`${newCartItems.length} item${newCartItems.length > 1 ? 's' : ''} transferred to your cart`);
  }

  return (
    <section className={`fixed z-[1000] right-0 top-0 w-screen h-screen transition-all duration-350 ease-in-out ${isWishListOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="fixed z-[1000] left-0 top-0 cursor-pointer bg-black/30 backdrop-blur-sm w-full h-full" onClick={() => setIsWishListOpen(false)}/>

        <article className="fixed overflow-y-auto right-0 bg-[#f0f0f0] dark:bg-[#0C0C1E] text-gray-600 dark:text-gray-400 p-12 max-md:p-8 max-sm:p-6 rounded-l-[10px] flex flex-col items-center gap-8 max-sm:gap-6 h-full max-w-[50%] max-lg:max-w-[60%] max-md:max-w-[75%] max-sm:max-w-full z-[100000] transition-all duration-300 opacity-100 visible">
          <div className="flex justify-between items-center w-full">
            <p className="font-bold font-poppins text-xl max-sm:text-lg text-black dark:text-white">Wishlist</p>
            <span className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Icon name="close" onClick={() => setIsWishListOpen(false)}/>
            </span>
          </div>

          {wishListItems.length > 0 ? (
            wishListItems.map((wishListItem, i) => (
              <Link 
                key={i} 
                onClick={() => setIsWishListOpen(false)}
                href={{pathname: `/categories/${wishListItem.category}/${wishListItem.productName}`, query: { productInfo: JSON.stringify(wishListItem)}}}
                className="group flex items-center gap-8 p-[24px] min-h-[220px] bg-white dark:bg-[#0F1125] rounded-lg border border-[#E5E5E5] dark:border-[#181C3A]"
              >
                <div className="w-[27%] max-md:w-[30%] h-full">
                  <Image src={wishListItem.productImage} alt={wishListItem.productName} width={1000} height={1000} className="object-contain h-full"/>
                </div>

                <div className="flex flex-col h-full justify-between flex-1">
                  <span className="flex flex-col gap-[1px]">
                    <h1 className="font-semibold font-poppins text-xl max-md:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400">{wishListItem.productName}</h1>
                    <p className="line-clamp-1 max-md:line-clamp-2 text-gray-600 dark:text-gray-400 text-sm">{wishListItem.productDescription}</p>
                  </span>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400"><span className="mr-[3px]">₦</span>{wishListItem.productPrice.toLocaleString()}</p>
                  <span className="flex justify-between">
                    <AddToCart product={wishListItem} icon/>
                    <span className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                      <Icon
                        name="trash"
                        noHover
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setWishListItems(prev => prev.filter(item => item.productId !== wishListItem.productId))
                        }}
                      />
                    </span>
                  </span>
                </div>
              </Link>
            ))
            ) : (
            <aside className="flex flex-col items-center">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                You currently have no items in your Wishlist
              </p>
              <Link 
                href="/categories"
                className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </aside> 
          )}
          
          {wishListItems.length > 0 && (
            <div className="sticky -bottom-12 max-md:-bottom-6 w-full bg-[#f0f0f0] dark:bg-[#0C0C1E] px-10 py-4 rounded-2xl">
              <aside className="flex justify-between">
                <Button 
                  type="fill" 
                  bgColor="#155dfc" 
                  bgHover="#1447e6" 
                  scaleOnHover={false} 
                  onClick={handleTransfer}
                >
                  Transfer all to cart
                </Button>

                <Button 
                  type="fill" 
                  bgColor="#FF0000" 
                  bgHover="#FF4747" 
                  scaleOnHover={false} 
                  onClick={() => {
                    setWishListItems([])
                    setIsWishListOpen(false)
                  }}
                >
                  Clear All
                </Button>
              </aside>
            </div>
          )}
        </article>
      </section>
  )
}

export default WishListModal