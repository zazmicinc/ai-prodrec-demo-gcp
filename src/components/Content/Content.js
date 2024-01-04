import React, { useContext, useEffect } from "react";
import Chat from "../Chat/Chat";
import { chatContext } from "../../context/chatContext";
import { socialMediaIcons } from "../../ui/socialMediaIcons";
import Footer from "../Footer/Footer";
import { trendingItems } from "../../ui/trendingItems";
import "./Content.css";
import CartButton from "../Cart/CartButton";
import CartModal from "../Cart/CartModal";

const Content = () => {
  const { cart, cartOpen } = useContext(chatContext);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div className="container">
      <div className={`content ${cartOpen ? "cart-open" : ""}`}>
        <div className="content__left">
          <h1 className="content__logo">TheChef.</h1>
          <p className="content__logo-info">Your kitchen assistant.</p>
          <p className="content__explore">
            Explore the power of your virtual kitchen <br /> assistant powered by
            the most advanced AI.
          </p>
          <span className="content__explore-start">
            Start by typing your request into the chat.
          </span>
          <p className="content__trending-title">Trending Recipes</p>
          <div className="content__trending">
            {trendingItems?.map((item, index) => (
              <div className="content__trending-btn" key={index}>
                <p className="content__trending-btn-text">{`${item.name} (${item.count})`}</p>
              </div>
            ))}
          </div>
          <div className="content__social">
            {socialMediaIcons.map((item, index) => (
              <div key={index} className="content__social-media">
                {item.icon}
              </div>
            ))}
          </div>
          <Footer />
        </div>
        <div className="content__right">
          <Chat />
        </div>
      </div>
      {cartOpen ? <CartModal /> : <CartButton />}
    </div>
  );
};

export default Content;
