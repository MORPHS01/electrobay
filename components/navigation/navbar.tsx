"use client"
import Image from 'next/image'
import Icon from '@/public/svg/svgicons'
import ElectrobayLogo  from '@/public/logo/electrobaylogo'
import ThemeSwitcher from './themeswitcher'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import { useStateContext } from '@/contexts/contextprovider'
import { useState } from 'react'
import { useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { LoggedIn, LoggedOut } from '../userProfile/authentication'
import { DesktopSearchBar, MobileSearchBar } from './searchbar'
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css';

type navbarProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}


function Navbar({name, email, image}: navbarProps) {
  const pathname = usePathname()
  const isNotHomePage = pathname !== '/'
  const {mounted, wishListItems, cartItems, userProfile, setUserProfile, setIsWishListOpen} = useStateContext();
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);

  const categories = ["All Products", "Laptops", "Smart phones", "TV", "Gaming", "Smart watches", "Headphones", "Computer Accessories", "Cameras"]

  const userProfileRef = useRef<HTMLDivElement | null>(null);

  const handleUserProfileToggle = () => {
    if (userProfile) {
      setUserProfile(false);
      setTimeout(() => setIsUserProfileVisible(false), 210); 
    } else {
      setIsUserProfileVisible(true);
      setTimeout(() => setUserProfile(true), 10);
    }
  };

  useClickOutside(userProfileRef, () => {
    setUserProfile(false);
    setTimeout(() => setIsUserProfileVisible(false), 210); 
  });

  return (
    <main className="sticky z-50 -top-[25px] flex justify-center">
      <nav className="absolute top-[32px] flex flex-col gap-3 shadow-md shadow-black/20 dark:shadow-[#78B1E4]/20 items-center w-[85%] backdrop-blur-sm bg-white/75 dark:bg-[#000022]/85 rounded-lg max-md:rounded-b-none py-[14px] max-md:py-[10px]">
        <div className="flex justify-between w-full px-8 max-md:px-4">
          <Link href="/" className="flex items-center">
            <ElectrobayLogo/>
          </Link>

          <DesktopSearchBar categories={categories}/>
          
          <section className="flex gap-3 items-center">
            {/* Wishlist */}
            <div className="relative" onClick={() => setIsWishListOpen(true)}>
              <Icon name="heart"/>
              { wishListItems.length > 99 &&  mounted ?
                <div className="absolute cursor-pointer px-[5px] py-0 -right-1.5 -top-1.5 rounded-full bg-[#78B1E4] dark:bg-[#2D75B4]">
                  <p className="text-xs">99+</p>
                </div>
                :
                wishListItems.length > 0 &&  mounted ?
                <div className="absolute cursor-pointer px-[5px] py-0 -right-1.5 -top-1.5 rounded-full bg-[#78B1E4] dark:bg-[#2D75B4]">
                  <p className="text-xs">{wishListItems.length}</p>
                </div>
                : null
              }
            </div>

            {/* User Profile */}
            <div ref={userProfileRef} className="relative">
              <span onClick={handleUserProfileToggle} className="cursor-pointer">
                {image ? <Image src={image} alt="User Profile" width={25} height={25} className="rounded-full w-[27px] max-md:w-[22px] aspect-square border-[2px] border-[#cbcbcb] dark:border-[#181C3A]"/> : <Icon name="user" />}
              </span>
              {name ? <LoggedIn name={name} email={email} image={image} visible={isUserProfileVisible}/> : <LoggedOut visible={isUserProfileVisible}/>}
            </div>
            
            {/* Cart */}
            <div className="relative" onClick={() => redirect("/cart")}>
              <Icon name="cart"/>
              { cartItems.length > 99 &&  mounted ?
                <div className="absolute cursor-pointer px-[5px] py-0 -right-1.5 -top-1.5 rounded-full bg-[#78B1E4] dark:bg-[#2D75B4]">
                  <p className="text-xs">99+</p>
                </div>
                :
                cartItems.length > 0 &&  mounted ?
                <div className="absolute cursor-pointer px-[5px] py-0 -right-1.5 -top-1.5 rounded-full bg-[#78B1E4] dark:bg-[#2D75B4]">
                  <p className="text-xs">{cartItems.length}</p>
                </div>
                : null
              }
            </div>

            <ThemeSwitcher/>
          </section>
        </div>

        {/* Extra content when not on home page */}
        {isNotHomePage && <hr className="w-full border border-[#E5E5E5] dark:border-[#181C3A] max-md:hidden"/>}

        {isNotHomePage && (
          <div className="flex justify-between w-full px-8 max-md:hidden">
            {categories.map((category, index) => (
              <Link key={index} href={`/categories/${category.toLowerCase().trim()}`} className="first:hidden text-sm text-[#000011] dark:text-[#F4F9FD] hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 ease-in-out">
                {category}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Header */}
        <MobileSearchBar categories={categories}/>
        
      </nav>
    </main>
  )
}

export default Navbar