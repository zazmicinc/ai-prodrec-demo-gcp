import { createContext, useState, useContext } from "react";

export const chatContext = createContext();

export function ChatProvider({ children }) {
  
  const [search, setSearch] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [chatData, setChatData] = useState([]);

  const [recipeChoice, setRecipeChoice] = useState(false);
  const [showCartIcon, setShowCartIcon] = useState(false);
  const [currentPage, setCurrentPage] = useState("Start Page");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      return newCart;
    });
  };
  const clearChat =() => {
    setRecipeChoice(false)
    setShowCartIcon(false)
    setSessionId('')
    setChatData([])
    setCart([])
    setCartOpen(false)
    setCurrentPage('Start Page')
    setSearch('')
  }

  return (
    <chatContext.Provider
      value={{
        search,
        setSearch,
        sessionId,
        setSessionId,
        chatData,
        setChatData,
        recipeChoice,
        setRecipeChoice,
        showCartIcon,
        setShowCartIcon,
        currentPage,
        setCurrentPage,
        cart,
        setCart,
        cartOpen,
        setCartOpen,
        removeFromCart,
        clearChat
      }}
    >
      {children}
    </chatContext.Provider>
  );
}
