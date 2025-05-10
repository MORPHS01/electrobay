"use client"
import { useClickOutside } from "@/hooks/useClickOutside";
import Icon from "@/public/svg/svgicons";
import React, { useRef, useState, useMemo } from "react";
import data from "@/data/products.json";
import Link from "next/link";
import { useRouter } from "next/navigation";




export function DesktopSearchBar({categories}: {categories: string[]}) {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleDropdownToggle = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
      setTimeout(() => setIsDropdownVisible(false), 210); 
    } else {
      setIsDropdownVisible(true);
      setTimeout(() => setIsDropdownOpen(true), 10);
    }
  };

  useClickOutside(dropDownRef, () => {
      setIsDropdownOpen(false);
      setTimeout(() => setIsDropdownVisible(false), 210); 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsSearchOpen(true)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTimeout(() => setIsSearchOpen(false), 140)
      const queryString = new URLSearchParams(query).toString().replace("=", "");
      router.push(`/search-results?query=${queryString}`)
      localStorage.setItem("searchResults", JSON.stringify(categoryFilter));
    }
  };

  // Search Algorithm
  const items = data;
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const filteredItems = useMemo(() => items.filter(item => item.productName.toLowerCase().includes(query.toLowerCase())), [query, items]);
  const categoryFilter = selectedCategory !== "All Products" ? filteredItems.filter(item => selectedCategory.trim().toLowerCase().includes(item.category.trim().toLowerCase())) : filteredItems

  return (
    <main className="w-[50%] flex items-stretch max-md:hidden">
      <section ref={dropDownRef} onClick={handleDropdownToggle} className="relative min-w-fit rounded-l-[8px] cursor-pointer bg-[#f0f0f0] dark:bg-[#0F1125] px-[1rem] py-[0.6rem] flex items-center gap-2">
        <Icon name="menu" noHover/>
        <p>{selectedCategory}</p>
        {/* Dropdown */}
        <div className={`absolute left-0 top-full rounded-[8px] transform transition-all duration-200 ease-out ${ isDropdownOpen ? "opacity-100 translate-y-0 z-[100]" : "opacity-0 -translate-y-10 -z-[100]" } ${ isDropdownVisible ? "block" : "hidden" }`}>
          <ul className="max-h-[250px] mt-1 min-w-[200px] w-full bg-[#f0f0f0] dark:bg-[#0F1125] border border-[#2A2B2A55] dark:border-[#181C3A] rounded-[8px] overflow-x-hidden">
            {categories.map((category, i) => (
              <li
                key={i}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 cursor-pointer hover:bg-[#e6e6e6] dark:hover:bg-[#12152F] border-b border-[#2A2B2A11] dark:border-[#181C3A] transition-all duration-250 ease-in-out ${selectedCategory === category && "bg-[#e6e6e6] dark:bg-[#12152F]"}`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex-grow relative">
        <input type="text" onChange={handleChange} value={query} onKeyDown={handleKeyDown} onFocus={() => setIsSearchOpen(true)} onBlur={() => setTimeout(() => setIsSearchOpen(false), 140)}  placeholder="I'm Searching for..." className="outline-none rounded-r-[8px] px-[1rem] w-full h-full bg-[#e6e6e6] dark:bg-[#12152F]"/>
        <div className="absolute w-fit h-[90%] top-1/2 -translate-y-1/2 right-[1rem] flex items-center justify-center bg-[#e6e6e6] dark:bg-[#12152F]">
          <Link href={{pathname: "/search-results", query: {query: query}}} onClick={() => localStorage.setItem("searchResults", JSON.stringify(categoryFilter))}>
            <Icon name="search"/>
          </Link>
        </div>
        {/* Search Options */}
        {isSearchOpen && query && (
          <div className="absolute right-0 top-full w-full min-w-[300px] rounded-[8px]">
            <aside className="flex flex-col max-h-[320px] mt-1 bg-[#e6e6e6] dark:bg-[#12152F] border border-[#2A2B2A55] dark:border-[#181C3A] rounded-[8px] overflow-x-hidden">
              {categoryFilter.length ? (
                categoryFilter.map((item, i) => (
                  <Link
                    key={i}
                    href={{pathname: `/categories/${item.category}/${item.productName}`, query: {productInfo: JSON.stringify(item)}}}
                    onClick={() => {
                      setQuery(item.productName);
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-[#dcdcdc] dark:hover:bg-[#1d2047] border-b border-[#2A2B2A11] dark:border-[#181C3A] transition-all duration-250 ease-in-out"
                  >
                    {item.productName}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500 dark:text-gray-400">No matches found.</p>
              )}
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}






export function MobileSearchBar({categories}: {categories: string[]}) {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isMobileDropdownVisible, setIsMobileDropdownVisible] = useState(false);
  const router = useRouter();

  const mobileDropDownRef = useRef<HTMLDivElement | null>(null);

  const handleMobileDropdownToggle = () => {
    if (isMobileDropdownOpen) {
      setIsMobileDropdownOpen(false);
      setTimeout(() => setIsMobileDropdownVisible(false), 210); 
    } else {
      setIsMobileDropdownVisible(true);
      setTimeout(() => setIsMobileDropdownOpen(true), 10);
    }
  };

  useClickOutside(mobileDropDownRef, () => {
    setIsMobileDropdownOpen(false);
    setTimeout(() => setIsMobileDropdownVisible(false), 210); 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileQuery(e.target.value)
    setIsSearchOpen(true)
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setTimeout(() => setIsSearchOpen(false), 140)
      const queryString = new URLSearchParams(mobileQuery).toString().replace("=", "");
      router.push(`/search-results?query=${queryString}`)
      localStorage.setItem("searchResults", JSON.stringify(categoryFilter));
    }
  };

  // Search Algorithm
  const items = data;
  const [mobileQuery, setMobileQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const filteredItems = useMemo(() => items.filter(item => item.productName.toLowerCase().includes(mobileQuery.toLowerCase())), [mobileQuery, items]);
  const categoryFilter = selectedCategory !== "All Products" ? filteredItems.filter(item => selectedCategory.trim().toLowerCase().includes(item.category.trim().toLowerCase())) : filteredItems

  return (
    <main className="hidden max-md:flex items-stretch w-full absolute top-full rounded-b-[8px] shadow-md shadow-black/20 dark:shadow-[#78B1E4]/20">
      <section ref={mobileDropDownRef} onClick={handleMobileDropdownToggle} className="relative min-w-fit rounded-bl-[8px] cursor-pointer bg-[#f0f0f0] dark:bg-[#0F1125] px-[1rem] py-[14px] flex items-center gap-2">
        <Icon name="menu" noHover/>
        <p className="text-sm">{selectedCategory}</p>
        {/* Dropdown */}
        <div className={`absolute left-0 top-full shadow-md transform transition-all duration-200 ease-out ${ isMobileDropdownOpen ? "opacity-100 translate-y-0 z-[100]" : "opacity-0 -translate-y-10 -z-[100]" } ${ isMobileDropdownVisible ? "block" : "hidden" }`}>
          <ul className="max-h-[250px] mt-1 min-w-[200px] w-full bg-[#f0f0f0] dark:bg-[#0F1125] border border-[#2A2B2A55] dark:border-[#181C3A] rounded-[8px] overflow-x-hidden">
            {categories.map((category, i) => (
              <li
                key={i}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 cursor-pointer hover:bg-[#e6e6e6] dark:hover:bg-[#12152F] border-b border-[#2A2B2A11] dark:border-[#181C3A] transition-all duration-250 ease-in-out ${selectedCategory === category && "bg-[#e6e6e6] dark:bg-[#12152F]"}`}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex-grow relative">
        <input type="text" onChange={handleChange} value={mobileQuery} onKeyDown={handleKeyDown} onFocus={() => setIsSearchOpen(true)} onBlur={() => setTimeout(() => setIsSearchOpen(false), 140)} placeholder="I'm Searching for..." className="outline-none rounded-br-[8px] px-[1rem] w-full h-full bg-[#e6e6e6] dark:bg-[#12152F]"/>
        <div className="absolute w-fit h-[90%] top-1/2 -translate-y-1/2 right-[1rem] flex items-center justify-center bg-[#e6e6e6] dark:bg-[#12152F]">
          <Link href={{pathname: "/search-results", query: {query: mobileQuery}}} onClick={() => localStorage.setItem("searchResults", JSON.stringify(categoryFilter))}>
            <Icon name="search"/>
          </Link>
        </div>
        {/* Search Options */}
        {isSearchOpen && mobileQuery && (
          <div className="absolute right-0 top-full w-full min-w-[200px] rounded-[8px]">
            <aside className="flex flex-col max-h-[320px] mt-1 bg-[#e6e6e6] dark:bg-[#12152F] border border-[#2A2B2A55] dark:border-[#181C3A] rounded-[8px] overflow-x-hidden">
              {categoryFilter.length ? (
                categoryFilter.map((item, i) => (
                  <Link
                    key={i}
                    href={{pathname: `/categories/${item.category}/${item.productName}`, query: {productInfo: JSON.stringify(item)}}}
                    onClick={() => {
                      setMobileQuery(item.productName);
                      setIsSearchOpen(false);
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-[#dcdcdc] dark:hover:bg-[#1d2047] border-b border-[#2A2B2A11] dark:border-[#181C3A] transition-all duration-250 ease-in-out"
                  >
                    {item.productName}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500 dark:text-gray-400">No matches found.</p>
              )}
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}
