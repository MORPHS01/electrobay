"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { ThemeProvider } from "next-themes";
import { useLocalStorage } from "@/hooks/uselocalstorage";
import { ProductType } from "@/types/productTypes";

type StateContextProps = {
  wishListItems: ProductType[];
  setWishListItems: Dispatch<SetStateAction<ProductType[]>>;
  cartItems: ProductType[];
  setCartItems: Dispatch<SetStateAction<ProductType[]>>;
  mounted: boolean;
  setMounted: Dispatch<SetStateAction<boolean>>;
  userProfile: boolean;
  setUserProfile: Dispatch<SetStateAction<boolean>>;
  isWishListOpen: boolean;
  setIsWishListOpen: Dispatch<SetStateAction<boolean>>;
};

const defaultState = {
  mounted: false,
} as StateContextProps;

const StateContext = createContext(defaultState);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [wishListItems, setWishListItems] = useLocalStorage<ProductType[]>(
    "wishlist",
    []
  );
  const [cartItems, setCartItems] = useLocalStorage<ProductType[]>("cart", []);
  const [mounted, setMounted] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [isWishListOpen, setIsWishListOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <StateContext.Provider
      value={{
        wishListItems,
        setWishListItems,
        cartItems,
        setCartItems,
        mounted,
        setMounted,
        userProfile,
        setUserProfile,
        isWishListOpen,
        setIsWishListOpen,
      }}
    >
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
