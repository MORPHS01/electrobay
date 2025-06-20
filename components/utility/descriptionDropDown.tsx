"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

type DescriptionDropDownProps = {
  header: string;
  children: React.ReactNode;
  openByDefault?: boolean;
};

export default function DescriptionDropDown({
  header,
  children,
  openByDefault = false,
}: DescriptionDropDownProps) {
  const [openIndex, setOpenIndex] = useState(openByDefault);
  return (
    <main
      className="bg-white dark:bg-[#0F1125] p-[30px] max-sm:p-[20px] rounded-[24px] cursor-pointer"
      onClick={() => setOpenIndex(!openIndex)}
    >
      <button className="w-full flex justify-between items-center text-left focus:outline-none cursor-pointer whitespace-nowrap">
        <span className="text-2xl max-md:text-lg font-medium">{header}</span>
        <span className="flex items-center gap-[5px]">
          <p className="text-[#1A4DE1] dark:text-[#78B1E4] font-normal max-sm:hidden">
            {openIndex ? "Show less" : "Show more"}
          </p>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 fill-[#1A4DE1] dark:fill-[#78B1E4] ${
              openIndex ? "rotate-180" : "rotate-0"
            }`}
          >
            <path d="M10.5 18.9596C5.55829 18.9596 1.54163 14.943 1.54163 10.0013C1.54163 5.05964 5.55829 1.04297 10.5 1.04297C15.4416 1.04297 19.4583 5.05964 19.4583 10.0013C19.4583 14.943 15.4416 18.9596 10.5 18.9596ZM10.5 2.29297C6.24996 2.29297 2.79163 5.7513 2.79163 10.0013C2.79163 14.2513 6.24996 17.7096 10.5 17.7096C14.75 17.7096 18.2083 14.2513 18.2083 10.0013C18.2083 5.7513 14.75 2.29297 10.5 2.29297Z" />
            <path d="M10.5 12.5099C10.3417 12.5099 10.1833 12.4516 10.0583 12.3266L7.11667 9.3849C6.87501 9.14323 6.87501 8.74323 7.11667 8.50156C7.35834 8.2599 7.75834 8.2599 8.00001 8.50156L10.5 11.0016L13 8.50156C13.2417 8.2599 13.6417 8.2599 13.8833 8.50156C14.125 8.74323 14.125 9.14323 13.8833 9.3849L10.9417 12.3266C10.8167 12.4516 10.6583 12.5099 10.5 12.5099Z" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {openIndex && (
          <motion.div
            initial={{ height: 0 }}
            animate={{
              height: "auto",
              transition: {
                type: "spring",
                duration: 0.4,
                bounce: 0,
              },
            }}
            exit={{
              height: 0,
              transition: {
                type: "spring",
                duration: 0.3,
                bounce: 0,
              },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.2, delay: 0.1 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.1 },
              }}
              className="text-[#2b2b2b] dark:text-[#F4F9FD] mt-[20px] max-md:mt-[10px] text-base"
            >
              <hr className="opacity-45 mb-[30px] max-md:mb-[20px] w-[97%] mx-auto max-sm:hidden" />
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
