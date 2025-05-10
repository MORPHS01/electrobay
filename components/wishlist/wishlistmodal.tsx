"use client"
import { useStateContext } from '@/contexts/contextprovider';
import Icon from '@/public/svg/svgicons';


function WishListModal() {
  const {isWishListOpen, setIsWishListOpen} = useStateContext();

  return (
    <section className={`fixed z-[10000] left-0 top-0 w-screen h-screen transition-all duration-400 ease-in-out ${isWishListOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="fixed z-[10000] left-0 top-0 cursor-pointer bg-black/30 backdrop-blur-sm w-full h-full" onClick={() => setIsWishListOpen(false)}/>

        <article className="fixed overflow-y-auto right-0 bg-[#f0f0f0] dark:bg-[#0F1125] text-gray-600 dark:text-gray-400 p-12 max-md:p-8 max-sm:p-6 rounded-l-[10px] flex flex-col items-center gap-8 max-sm:gap-6 h-full max-w-[50%] max-lg:max-w-[60%] max-md:max-w-[75%] max-sm:max-w-[85%] z-[100000] transition-all duration-300 opacity-100 visible">
          <div className="flex justify-between items-center w-full">
            <p className="font-bold font-poppins text-xl max-sm:text-lg text-black dark:text-white">Wishlist</p>
            <Icon name="close" onClick={() => setIsWishListOpen(false)}/>
          </div>

          {Array.from({length: 20}, (each, i) => <p key={i} className="font-poppins text-center text-base">Thank you for booking our service <b>[user]</b>! We truly appreciate your trust. Our team will review your request and contact you shortly to confirm the details and ensure a smooth experience.</p> )}
          
        </article>
      </section>
  )
}

export default WishListModal