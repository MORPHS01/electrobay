"use client";
import { usePathname } from "next/navigation";

function ModifiedChildren({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      className={`pb-[80px] flex-1 ${
        !isHome && "pt-[180px] px-[7%] max-sm:px-[15px]"
      }`}
    >
      {children}
    </main>
  );
}

export default ModifiedChildren;
