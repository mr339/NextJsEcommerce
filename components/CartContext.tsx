import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }: any) => {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState<any>([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      const cartData = ls.getItem("cart");
      if (cartData !== null) {
        setCartProducts(JSON.parse(cartData));
      }
    }
  }, []);

  const addProduct = (productId: any) => {
    setCartProducts((prev: any) => [...prev, productId]);
  };

  const removeProduct = (productId: any) => {
    setCartProducts((prev: any) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value: any, index: any) => index !== pos);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    localStorage.setItem("cart", "");
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
