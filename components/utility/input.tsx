"use client";

import { useState } from "react";

type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Input({ label, ...rest }: inputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="relative rounded-xl"
    >
      <p
        className={`absolute -top-2 left-3 px-1 text-xs font-bold bg-[#F4F9FD] dark:bg-[#000012] ${
          focused && "text-[#1A4DE1] dark:text-[#78B1E4]"
        }`}
      >
        {label}
      </p>
      <input
        {...rest}
        className="outline outline-[#2A2B2A]/40 dark:outline-[#E5E5E5]/40 focus:outline-2 focus:outline-[#1A4DE1] dark:focus:outline-[#78B1E4] font-poppins w-full h-full px-7 py-4 rounded-xl placeholder:max-sm:text-sm"
      />
    </div>
  );
}

export default Input;
