import React from "react";

const CartPreview = ({ cart, changeQuantity, removeItem }) => {
  return (
    <div className="cart__body">
      {cart.map((book) => (
        <div className="cart__item" key={book.id}>
          <div className="cart__book">
            <img
              src={book.url}
              className="cart__book--img"
              alt={book.title}
            />
            <div className="cart__book--info">
              <span className="cart__book--title">{book.title}</span>
              <span className="Cart__book--price">
                ${(book.salePrice || book.originalPrice).toFixed(2)}
              </span>
              <button
                className="cart__book--remove"
                onClick={() => removeItem(book)}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="cart__quantity">
            <input
              type="number"
              min={0}
              max={99}
              className="cart__input"
              value={+book.quantity}
              onChange={(event) => changeQuantity(book, event.target.value)}
            />
          </div>
          <div className="cart__total">
            $
            {((book.salePrice || book.originalPrice) * book.quantity).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPreview;