import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }: any) => {
  const [cartProducts, setCartProducts] = useState<any>([]);

  const addProduct = (productId: any) => {
    setCartProducts((prev: any) => [...prev, productId]);
  };
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
