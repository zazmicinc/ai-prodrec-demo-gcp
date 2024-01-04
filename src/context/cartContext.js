import { createContext, useState } from "react";

export const cartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };
  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        cartOpen,
        setCartOpen,
        removeFromCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
