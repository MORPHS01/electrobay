"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    const scrollButton = document.getElementById("scrollToTopButton");

    if (scrollButton) {
      const toggleVisibility = () => {
        if (window.scrollY > 300) {
          scrollButton.style.display = "block";
        } else {
          scrollButton.style.display = "none";
        }
      };

      // Add event listeners for scroll and click
      document.addEventListener("scroll", toggleVisibility);
      scrollButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Cleanup function to remove listeners when the component unmounts
      return () => {
        document.removeEventListener("scroll", toggleVisibility);
        scrollButton.removeEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      };
    }
  }, []);

  return (
    <main
      id="scrollToTopButton"
      className="fixed bottom-5 right-5 z-[100] cursor-pointer rounded-full bg-[#78B1E4] p-3.5 max-sm:p-3"
    >
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[30px] h-[30px] max-md:w-[20px] max-md:h-[20px] max-sm:w-[15px] max-sm:h-[15px]"
      >
        <path
          d="M11 17V5.414l3.293 3.293a.999.999 0 101.414-1.414l-5-5a.999.999 0 00-1.414 0l-5 5a.997.997 0 000 1.414.999.999 0 001.414 0L9 5.414V17a1 1 0 102 0z"
          fill="#0A141D"
        />
      </svg>
    </main>
  );
}
