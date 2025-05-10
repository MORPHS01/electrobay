import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Kaushan_Script } from "next/font/google";
import "./globals.css";
import { Breadcrumbs, Footer, ModifiedChildren, NavBarProvider, ScrollToTop, WishListModal } from "@/components";
import { ContextProvider } from "@/contexts/contextprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: "400", 
  subsets: ["latin"], 
});

const kaushan_Script = Kaushan_Script({
  variable: "--font-kaushanScript", 
  weight: "400", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElectroBay",
  description: "Your Bay for Breakthrough Tech",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${kaushan_Script.variable} z-[1] min-h-screen flex flex-col text-base max-sm:text-sm text-[#00001f] dark:text-[#d7d7d7] bg-[#F4F9FD] dark:bg-[#000012] transition-colors duration-300 ease-in-out antialiased`}>
        <ContextProvider>
          <NavBarProvider/>
          <ModifiedChildren>
            <Breadcrumbs/> 
            {children}
          </ModifiedChildren>
          <ScrollToTop/>
          <Footer/>

          <WishListModal/>
        </ContextProvider>
      </body>
    </html>
  );
}
