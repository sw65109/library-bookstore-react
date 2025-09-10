import React from "react";
import { useNavigate } from "react-router-dom";

const BillingShipping = ({ cart, total }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/confirmation", {
      state: {
        cart,
        total,
      },
    });
  };

  return (
    <div className="billing__page">
      <main>
        <div className="billing__container">
          <h2 className="billing__title">Billing & Shipping Information</h2>
          <form
            className="billing__form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h3>Shipping Address</h3>
            <input
              className="billing__input"
              type="text"
              placeholder="Full Name"
              required
            />
            <input
              className="billing__input"
              type="text"
              placeholder="Street Address"
              required
            />
            <input
              className="billing__input"
              type="text"
              placeholder="City"
              required
            />
            <input
              className="billing__input"
              type="text"
              placeholder="State/Province"
              required
            />
            <input
              className="billing__input"
              type="number"
              placeholder="ZIP/Postal Code"
              required
            />
            <input
              className="billing__input"
              type="text"
              placeholder="Country"
              required
            />
            <input
              className="billing__input"
              type="email"
              placeholder="Email"
              required
            />

            <h3>Billing Details</h3>
            <input
              className="billing__input"
              type="text"
              placeholder="Mock Name on Card"
              name="mockName"
              required
            />
            <input
              className="billing__input"
              type="number"
              placeholder="Mock Card Number"
              name="mockCardNumber"
              required
            />
            <input
              className="billing__input"
              type="number"
              placeholder="Mock MM/YY"
              name="mockExpiration"
              required
            />
            <input
              className="billing__input"
              type="number"
              placeholder="Mock CVV"
              name="mockCVV"
              required
            />

            <button className="btn billing__btn" type="submit">
              Place Order
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BillingShipping;
