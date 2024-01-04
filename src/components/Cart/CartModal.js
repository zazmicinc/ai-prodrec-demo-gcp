import React, { useContext, useEffect, useState } from "react";
import "./CartModal.css";
import { chatContext } from "../../context/chatContext";
import { Remove } from "../../assets/svg";
import logoGoogleShopping from "../../assets/logo_google_shopping.png";
import logoWalmart from "../../assets/walmart.jpeg";
import CreditCard from "../Checkout/CreditCard";
import Address from "../Checkout/Address";
import Summary from "../Checkout/Summary";

function CartModal() {
  const { cart, setCartOpen, removeFromCart, clearChat } = useContext(chatContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsContainerShow, setItemsContainerShow] = useState(true);
  const [checkoutContainerShow, setCheckoutContainerShow] = useState(false);
  const [summaryShow, setSummaryShow] = useState(false);


  useEffect(() => {
    let total = 0;

    cart.map((item) => {
      const price = item.price[0] === "$" ? item.price.slice(1) : 0;

      if (parseFloat(price)) {
        total += parseFloat(price);
      }

      setTotalPrice(() => {
        return total.toFixed(2);
      });
    });
  }, [cart]);
  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };
  const handleCheckoutBtn = () => {
    setItemsContainerShow(false)
    setCheckoutContainerShow(true)
  };

  const handleItemShowBtn = () => {
    setItemsContainerShow(true)
    setCheckoutContainerShow(false)
  };

  const handlePayBtn = () => {
    setItemsContainerShow(false)
    setCheckoutContainerShow(false)
    setSummaryShow(true)
  };

  const handleBackToChatBtn = () => {
    setItemsContainerShow(true)
    setCheckoutContainerShow(false)
    setSummaryShow(false)
    clearChat()
  };

  const totalPriceWithTax = (parseFloat(totalPrice) * 1.02).toFixed(2);
  return (
    <div className="cart-modal">
      <div className="cart-modal-section">
        {
          !summaryShow && (
            <div className="cart-modal-header">
              <div className="cart-modal-counter">
                <h3 className="cart-modal__title">Cart ({cart.length})</h3>
              </div>
              <div className="cart-modal__close" onClick={() => setCartOpen(false)}>
                <img
                  className="cart-modal__close-icon"
                  src="./images/x-white.svg"
                  alt="close"
                />
              </div>
            </div>
          )
        }
        <div className="cart-modal__content">
          {
            checkoutContainerShow && (
              <div className="cart-modal__items-container">
                <div className="cart-modal__shop-block">
                  <div className="cart-modal__shop">
                    <input id='googleShopping' type="radio" name="shop" value="googleShopping" checked />
                    <label for='googleShopping'><img className="shoplogo" src={logoGoogleShopping} /></label>
                  </div>
                  <div className="cart-modal__shop">
                    <input id='walmart' type="radio" name="shop" value="walmart" />
                    <label for='walmart'><img className="shoplogo" src={logoWalmart} /></label>
                  </div>
                </div>
                <div className="cart-modal__address-block">
                  <Address />
                </div>
                <div className="cart-modal__cc-block">
                  <CreditCard />
                </div>
              </div>
            )
          }
          {
            summaryShow && (
              <div className="cart-modal__items-container">
                <Summary />
              </div>
            )
          }
          {
            itemsContainerShow && (
              <div className="cart-modal__items-container">
                <div className="cart-modal__items-overflow">
                  {cart.map((item, index) => {
                    return (
                      <div className="cart-modal__item" key={index}>
                        <img
                          className="cart-modal__item-img"
                          src={item.img}
                          alt="item"
                        />
                        <p className="cart-modal_title">{item.name}</p>
                        <p className="cart-modal_weight">{item.weight}</p>
                        <p className="cart-modal_price">{item.price}</p>
                        <div
                          className="cart-modal__delete-button"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <Remove />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          }
          <div className="cart-modal__bottom-block">
            <div className="cart-modal__btns">
              <div className="cart-modal__btn prev">
                {!itemsContainerShow && checkoutContainerShow && (<button onClick={handleItemShowBtn}><span>back</span></button>)}
                {!itemsContainerShow && !checkoutContainerShow && summaryShow && (<button onClick={handleBackToChatBtn}><span>back to chat</span></button>)}
              </div>
              <div className="cart-modal__btn next">
                {itemsContainerShow && !checkoutContainerShow && (<button onClick={handleCheckoutBtn}><span>checkout</span></button>)}
                {!itemsContainerShow && checkoutContainerShow && (<button onClick={handlePayBtn}><span>place order</span></button>)}
              </div>
            </div>
            <div className="cart-modal__total">
              {totalPrice > 0 && (
                <div className="cart-modal__sumBlock">
                  <div className="cart-modal__sumLine">
                    <p className="cart-modal__priceTotal">Subtotal</p>
                    <p className="cart-modal__priceTotal">Grand Total</p>
                  </div>
                  <div className="cart-modal__sumLine">
                    <p className="cart-modal__priceTotal">${totalPrice}</p>
                    <div className="cart-modal__taxWrapp">
                      <p className="cart-modal__priceTotal">
                        ${totalPriceWithTax}
                      </p>{" "}
                      <p className="cart-modal__tax"> (+2% tax)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="cart-modal-pay">
        <h2 className="cart-modal-payTitle">Pay with:</h2>
        <img
          className="cart-modal__payImg"
          src="./images/stripe1.png"
          alt="stripe"
        />
        <img
          className="cart-modal__payImg"
          src="./images/amex2.png"
          alt="amex"
        />
        <img
          className="cart-modal__payImg"
          src="./images/credit3.png"
          alt="credit"
        />
        <img
          className="cart-modal__payImg"
          src="./images/paypal4.png"
          alt="paypal"
        />
        <img
          className="cart-modal__payImg"
          src="./images/visa5.png"
          alt="visa"
        />
        <img
          className="cart-modal__payImg"
          src="./images/applepay6.png"
          alt="applepay"
        />
      </div>
    </div>
  );
}

export default CartModal;
