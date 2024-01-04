import React, { useContext, useEffect } from "react";
import "./Checkout.css";
import CreditCardInputMask from "credit-card-input-mask";



const CreditCard = () => {
    useEffect(() => {
        const formattedCreditCardInput = new CreditCardInputMask({
            element: document.querySelector("#credit-card"),
            pattern: "{{9999}} {{9999}} {{9999}} {{9999}}",
        });
        const formattedExpirationInput = new CreditCardInputMask({
            element: document.querySelector("#expiration"),
            pattern: "{{99}} / {{9999}}",
        });
        const formattedCvvInput = new CreditCardInputMask({
            element: document.querySelector("#cvv"),
            pattern: "{{9999}}",
        });
    }, []);
    return (
        <div className="creditcard">
            <h3 >Credit Card</h3>
            <input id="credit-card" type="tel" placeholder="Card Number" />
            <div>
                <input id="expiration" type="tel" placeholder="mm/yyyy" />
                <input id="cvv" type="tel" placeholder="cvv" />
            </div>
        </div>
    );
};

export default CreditCard;