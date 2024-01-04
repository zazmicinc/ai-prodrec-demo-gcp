import React, { useContext } from "react";
import "./CartButton.css";
import { chatContext } from "../../context/chatContext";

function CartButton() {
  const { setCartOpen } = useContext(chatContext);

  return (
    <div
      className="cart-button"
      onClick={() => {
        setCartOpen(true);
      }}
    >
      <img className="cart-button__icon" src="./images/cart.svg" alt="cart" />
    </div>
  );
}

export default CartButton;
