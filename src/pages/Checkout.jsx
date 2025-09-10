import React from "react";
import CartLayout from "../components/ui/CartLayout";

const Checkout = ({ cart, changeQuantity, removeItem }) => {

  const getTotal = () => cart.reduce((sum, item) => sum + (item.salePrice || item.originalPrice) * item.quantity, 0);
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
      title="Checkout"
      buttonLabel="Place Order"
      linkTo="/billing"
    />
  );
};

export default Checkout;