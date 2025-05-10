"use client";
import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from "react";
import { ThemeProvider } from "next-themes"
import { useLocalStorage } from "@/hooks/uselocalstorage";

type StateContextProps = {
  wishListValue: string[];
  setWishListValue: Dispatch<SetStateAction<string[]>>;  
  cartValue: string[];
  setCartValue: Dispatch<SetStateAction<string[]>>;
  mounted: boolean;
  setMounted: Dispatch<SetStateAction<boolean>>;
  userProfile: boolean;
  setUserProfile: Dispatch<SetStateAction<boolean>>;
  isWishListOpen: boolean;
  setIsWishListOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  mounted: false,
} as StateContextProps;

const StateContext = createContext(defaultState);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [wishListValue, setWishListValue] = useLocalStorage<string[]>("wishlist", []);
  const [cartValue, setCartValue] = useLocalStorage<string[]>("cart", []);
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <StateContext.Provider value={{ wishListValue, setWishListValue, cartValue, setCartValue, mounted, setMounted, userProfile, setUserProfile, isWishListOpen, setIsWishListOpen }}>
      <ThemeProvider attribute="class">
        {children}
      </ThemeProvider>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);