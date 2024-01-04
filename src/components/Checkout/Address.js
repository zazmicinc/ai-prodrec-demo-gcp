import React, { useContext, useEffect } from "react";
import "./Checkout.css";

const Address = () => {
  
    return (
        <div className="creditcard">
            <h3 >Address</h3>
            <div>
                <input id="FirstName" type="text" placeholder="First Name" />
                <input id="LastName" type="text" placeholder="Last Name" />
            </div>
            <div>
                <input id="Country" type="text" placeholder="Country" />
                <input id="PhoneNumber" type="tel" placeholder="Phone Number" />
            </div>
            <div>
                <input id="City" type="text" placeholder="City" />
                <input id="Zipcode" type="tel" placeholder="Zip code" />
            </div>
            <input id="StreetDetails" type="text" placeholder="Street Details" />
        </div>
    );
};

export default Address;