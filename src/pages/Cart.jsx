import React, { useEffect } from "react";
import CartLayout from "../components/ui/CartLayout";
import { analytics } from "../firebase/init";
import { logEvent } from "firebase/analytics";


const Cart = ({ cart, changeQuantity, removeItem }) => {
  useEffect(() => {
    logEvent(analytics, "cart_viewed", {
      item_count: cart.length,
      cart_value: cart.reduce(
        (sum, item) =>
          sum + (item.salePrice || item.originalPrice) * item.quantity,
        0
      ),
    });
  }, [cart]);

  const getTotal = () => cart.reduce(
    (sum, item) => 
      sum + (item.salePrice || item.originalPrice) * item.quantity, 
    0);
  const subTotal = () => +(getTotal() * 0.9).toFixed(2);
  const tax = () => +(getTotal() * 0.1).toFixed(2);
  const total = () => +getTotal().toFixed(2);

  return (
    <CartLayout
      cart={cart}
      changeQuantity={changeQuantity}
      removeItem={removeItem}
      subTotal={subTotal}
      tax={tax}
      total={total}
      title="Cart"
      buttonLabel="Proceed to checkout"
      linkTo="/checkout"
    />
  );
};

export default Cart;