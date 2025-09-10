import React from "react";
import { Link } from "react-router-dom";
import CartPreview from "./CartPreview";
import EmptyCart from "../../assets/empty_cart.svg";

const CartLayout = ({
  cart,
  changeQuantity,
  removeItem,
  subTotal,
  tax,
  total,
  title,
  buttonLabel,
  linkTo
}) => {
  return (
    <div className="cart">
      <div className="book__selected--top">
        <h2 className="cart__title">{title}</h2>
      </div>

      {cart.length === 0 ? (
        <div className="cart__empty">
          <img src={EmptyCart} alt="" className="cart__empty--img" />
          <h2>
            Your cart is empty.
            <br />
            Do you want to continue shopping?
          </h2>
          <Link to="/books">
            <button className="btn">Browse Books</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="cart__header">
            <span className="cart__book">Book</span>
            <span className="cart__quantity">Quantity</span>
            <span className="cart__total">Price</span>
          </div>

          <CartPreview
            cart={cart}
            changeQuantity={changeQuantity}
            removeItem={removeItem}
          />

          <div className="total">
            <div className="total__item total__sub--total">
              <span>Subtotal</span>
              <span>${subTotal().toFixed(2)}</span>
            </div>
            <div className="total__item total__tax">
              <span>Tax</span>
              <span>${tax().toFixed(2)}</span>
            </div>
            <div className="total__item total__price">
              <span>Total</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <Link to={linkTo}>
              <button className="btn btn__checkout" type="button">
                {buttonLabel}
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartLayout;
