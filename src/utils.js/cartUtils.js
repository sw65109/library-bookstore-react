export const getTotal = (cart) =>
    cart.reduce((acc, item) => acc + (item.salePrice || item.originalPrice) * item.quantity, 0);
  
  export const subTotal = (cart) => +(getTotal(cart) * 0.9).toFixed(2);
  export const tax = (cart) => +(getTotal(cart) * 0.1).toFixed(2);
  export const total = (cart) => +getTotal(cart).toFixed(2);
  