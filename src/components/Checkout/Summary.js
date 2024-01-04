import React, { useContext, useEffect, useState } from "react";
import "./Checkout.css";
import { chatContext } from "../../context/chatContext";

const Summary = () => {
    const { cart, setCart, clearChat } = useContext(chatContext);
    const [orderItems, setOrderItems] = useState(cart);

    useEffect(() => {
        // setCart([])
    }, [orderItems]);
    return (
        <div className="creditcard">
            <h3 >Order #123456</h3>
            <div>
                {orderItems.map((item, index) => {
                    return (
                        <div className="cart-modal__item summary" key={index}>
                            <p className="cart-modal_title">{item.name}</p>
                            <p className="cart-modal_weight">{item.weight}</p>
                            <p className="cart-modal_price">{item.price}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Summary;



// img
// : 
// "https://www.foodingredientfacts.org/wp-content/uploads/2019/04/AdobeStock_283156247-a-how-to-guide-to-the-ingredient-list-1-e1579114065189.jpeg"
// name
// : 
// "Spaghetti"
// price
// : 
// "$1.99"
// weight
// : 
// "300g"