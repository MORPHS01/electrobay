"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

type baseProps = {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  spinnerColor?: "white" | "gray" | "black";
  onClick?: () => void;
  formType?: "submit";
  className?: string;
  scaleOnHover?: boolean;
};

type filledButton = {
  type?: "fill";
  bgColor: string;
  bgHover: string;
  textColor?: string;
};

type outlinedButton = {
  type: "outline";
  outLineColor: string;
};

type buttonProps = baseProps & (filledButton | outlinedButton);

// Button
export default function Button(props: buttonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    children,
    type = "fill",
    loading,
    disabled,
    onClick,
    formType,
    spinnerColor,
    className,
    scaleOnHover,
  } = props;

  // Conditional destructuring based on type
  const isFill = type === "fill";
  const bgColor = isFill ? (props as filledButton).bgColor : undefined;
  const bgHover = isFill ? (props as filledButton).bgHover : undefined;
  const textColor = isFill
    ? (props as filledButton).textColor || "white"
    : undefined;
  const outLineColor = !isFill
    ? (props as outlinedButton).outLineColor
    : undefined;
  const scaledUp = scaleOnHover !== undefined ? scaleOnHover : isFill;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={formType}
      style={
        type === "fill"
          ? { backgroundColor: isHovered ? bgHover : bgColor, color: textColor }
          : {
              backgroundColor: isHovered ? "#8989891A" : "transparent",
              color: outLineColor,
            }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${twMerge(
        "px-6 py-3 w-fit cursor-pointer tracking-wider rounded-lg active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 ease-in-out",
        type === "outline" &&
          "border border-[#2A2B2A44] dark:border-[#4A97DB44]",
        scaledUp && "hover:scale-110",
        className
      )}`}
    >
      {loading ? <Spinner spinnerColor={spinnerColor} /> : children}
    </button>
  );
}

type spinnerProps = {
  spinnerColor?: "white" | "gray" | "black";
};

// Spinner
export const Spinner = ({ spinnerColor }: spinnerProps) => (
  <div className="flex justify-center items-center px-8">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
      viewBox="0 0 24 24"
      className={
        spinnerColor === "white"
          ? "fill-[#ffffff]"
          : spinnerColor === "black"
          ? "fill-[#000000]"
          : spinnerColor === "gray"
          ? "fill-[#767676]"
          : "fill-[#767676] dark:fill-[#2E5685]"
      }
    >
      <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
  </div>
);
