"use client"

import Icon from "@/public/svg/svgicons"
import Link from "next/link"


function Footer() {
  const currentYear = new Date().getFullYear()

  const hrClassName ="w-full border border-[#E5E5E5] dark:border-[#181C3A]"
  const headerClassName ="font-semibold text-lg max-md:text-base text-black dark:text-white"
  const hoverClassName ="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ease-in-out"

  return (
    <footer className="flex flex-col items-center bg-white dark:bg-[#000022] rounded-t-[20px]">
      <section className="flex max-md:flex-col max-md:gap-[25px] justify-between text-[#939393] dark:text-[#BBD8F2] py-[55px] max-md:py-[37px] w-[90%] max-md:w-[80%]">
        <div className="flex flex-col gap-[8px] max-md:hidden">
          <p className={headerClassName}>E-commerce support</p>
          <p>ElectroBay</p>
          <div className="flex flex-col gap-[2px]">
            <p>Thomas 321</p>
            <p>2214 RT Lagos</p>
            <p>Nigeria</p>
          </div>
          <p>Phone: +2348025907227</p>
          <p>Email: support@electrobay.com</p>
        </div>

        <div className="flex flex-col gap-[8px] max-lg:hidden">
          <p className={headerClassName}>Working hours</p>
          <p>Monday to Friday: 09:00 - 18:00</p>
          <p>Saturday: 10:00 - 16:00</p>
          <p>Sunday: Closed</p>
        </div>

        <div className="flex flex-col gap-[8px] max-md:hidden">
          <p className={headerClassName}>About us</p>
          <p className={hoverClassName}>Stores</p>
          <p className={hoverClassName}>Corporate website</p>
          <p className={hoverClassName}>Exclusive Offers</p>
          <p className={hoverClassName}>Career</p>
        </div>

        <div className="flex flex-col gap-[8px] max-md:hidden">
          <p className={headerClassName}>Help &amp; Support</p>
          <p className={hoverClassName}>Help center</p>
          <p className={hoverClassName}>Payments</p>
          <p className={hoverClassName}>Product returns</p>
          <p className={hoverClassName}>FAQ</p>
        </div>

        {/* Mobile Footer */}
        <section className="hidden max-md:flex justify-between">
          <div className="hidden max-md:flex flex-col gap-[8px]">
            <p className={headerClassName}>E-commerce support</p>
            <p>ElectroBay</p>
            <div className="flex flex-col gap-[2px]">
              <p>Thomas 321</p>
              <p>2214 RT Lagos</p>
              <p>Nigeria</p>
            </div>
            <p>Phone: +2348025907227</p>
            <p>Email: support@electrobay.com</p>
          </div>

          <div className="hidden max-md:flex flex-col gap-[8px] text-end">
            <p className={headerClassName}>About us</p>
            <p className={hoverClassName}>Stores</p>
            <p className={hoverClassName}>Corporate website</p>
            <p className={hoverClassName}>Exclusive Offers</p>
            <p className={hoverClassName}>Career</p>
          </div>
        </section>

        <div className="flex flex-col gap-[16px] max-md:text-center max-md:items-center max-md:w-full">
          <p className={headerClassName}>Sign up for exclusive offers and the latest news!</p>

          <div className="relative w-full rounded-lg text-black dark:text-white">
            <div className="absolute top-1/2 -translate-y-1/2 left-[10px]">
              <Icon noHover noPointer name="envelope"/>
            </div>
            <input placeholder="Enter Your Email..." className="border border-[#000022]/55 dark:border-[#ffffff]/77 font-poppins w-full h-full px-[40px] py-[12px] rounded-lg placeholder:max-sm:text-sm"/>
          </div>

          <div className="flex gap-[7px] max-md:gap-[15px]">
            <Icon name="facebook"/>
            <Icon name="instagram"/>
            <Icon name="twitter"/>
          </div>
        </div>
      </section>
      
      <hr className={hrClassName}/>
      <section className="flex max-md:flex-col-reverse max-md:gap-[10px] max-md:justify-start justify-between items-center w-[85%] py-[20px]">
        <p className="text-[#939393] dark:text-[#BBD8F2]">&copy; {currentYear} ElectroBay. All Rights Reserved.</p>
        <div className="flex items-center gap-[60px] max-md:gap-[10px] max-md:justify-between max-md:w-full">
          <Link target="_blank" href="https://ayonimofe-portfolio-website.vercel.app/" className={hoverClassName}>Privacy policy</Link>
          <Link target="_blank" href="https://ayonimofe-portfolio-website.vercel.app/" className={hoverClassName && "max-sm:hidden"}>Cookie settings</Link>
          <Link target="_blank" href="https://ayonimofe-portfolio-website.vercel.app/" className={hoverClassName}>Terms and conditions</Link>
        </div>
      </section>

      <hr className={hrClassName}/>
      <section className="flex justify-center items-center w-[85%] py-[7px]">
        <p className="font-kaushanScript max-sm:flex max-sm:flex-col max-sm:items-center"><span>Designed and Developed by</span> <Link target="_blank" href="https://ayonimofe-portfolio-website.vercel.app/" className="font-poppins text-[#00e0e0] dark:text-[#00ffff]">Ayonimofe Atoyebi</Link></p>
      </section>
    </footer>
  )
}

export default Footer