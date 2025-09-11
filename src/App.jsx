import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import BillingShipping from "./pages/BillingShipping";
import { books } from "./data";
import { analytics } from "./firebase/init";
import { logEvent } from "firebase/analytics";


function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    logEvent(analytics, "app_loaded");
  }, []);

  function addToCart(book) {
    const updatedCart = [...cart, { ...book, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id ? { ...item, quantity: +quantity } : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter((book) => book.id !== item.id));
  }

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem("cart");
  }, [])

  function numberOfItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  function calculateTotal() {
    return cart.reduce((total, item) => {
      const price = item.salePrice || item.originalPrice;
      return total + price * item.quantity;
    }, 0).toFixed(2);
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route
            path="/books/:id"
            element={
              <BookInfo books={books} cart={cart} addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                books={books}
                cart={cart}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                removeItem={removeItem}
                changeQuantity={changeQuantity}
              />
            }
          />
          <Route
            path="/confirmation"
            element={<Confirmation clearCart={clearCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/billing"
            element={
              <BillingShipping
                cart={cart}
                total={calculateTotal()}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
