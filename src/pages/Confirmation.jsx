import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Confirmation = ({ clearCart }) => {
  const { state } = useLocation();
  const { cart, total } = state || {};

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="confirmation__wrapper">
          <div className="books__container">
            <div className="row">
              <div className="confirmation__container">
                <div className="confirmation__icon">✅</div>

                <h2 className="confirmation__title">
                  Thank you for your order!
                </h2>

                <p className="confirmation__message">
                  Your order has been placed successfully.
                  <br />
                  You will receive a confirmation email soon.
                </p>

                {cart && (
                  <div className="order__summary">
                    <h3>Order Summary</h3>
                    <ul>
                      {cart.map((item) => {
                        const unitPrice = item.salePrice || item.originalPrice;
                        const lineTotal = (unitPrice * item.quantity).toFixed(
                          2
                        );
                        return (
                          <li key={item.id}>
                            {item.title} (Qty: {item.quantity}) — $
                            {unitPrice.toFixed(2)} each
                            <br />
                            Line Total: ${lineTotal}
                          </li>
                        );
                      })}
                    </ul>

                    <p>
                      <strong>Total:</strong> ${total}
                    </p>
                  </div>
                )}

                <Link to="/books">
                  <button className="btn">Continue Shopping</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
