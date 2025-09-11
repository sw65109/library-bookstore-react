import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/init";
import { addDoc, collection } from "firebase/firestore";

const BillingShipping = ({ cart, total }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
    mockName: "",
    mockCardNumber: "",
    mockExpiration: "",
    mockCVV: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      name: formData.fullName,
      email: formData.email,
      address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}, ${formData.country}`,
      cart,
      total: parseFloat(total),
      createdAt: new Date().toISOString(),
    };

    setIsLoading(true);
    setError("");
    try {
      if (Math.random() < 0.5) {
        throw new Error("Simulated random error (for demo purposes)");
      }
      await addDoc(collection(db, "orders"), orderData);
      navigate("/confirmation", {
        state: {
          cart,
          total,
        },
      });
    } catch {
      setError("Could not place order. please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="billing__page">
      <main>
        <div className="billing__container">
          <h2 className="billing__title">Billing & Shipping Information</h2>
          {isLoading && <div>Placing order...</div>}
          <form
            className="billing__form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h3>Shipping Address</h3>
            <input
              className="billing__input"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="text"
              name="state"
              placeholder="State/Province"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="number"
              name="zip"
              placeholder="ZIP/Postal Code"
              value={formData.zip}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <h3>Billing Details</h3>
            <input
              className="billing__input"
              type="text"
              name="mockName"
              placeholder="Mock Name on Card"
              value={formData.mockName}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="number"
              name="mockCardNumber"
              placeholder="Mock Card Number"
              value={formData.mockCardNumber}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="number"
              name="mockExpiration"
              placeholder="Mock MM/YY"
              value={formData.mockExpiration}
              onChange={handleChange}
              required
            />
            <input
              className="billing__input"
              type="number"
              name="mockCVV"
              placeholder="Mock CVV"
              value={formData.mockCVV}
              onChange={handleChange}
              required
            />

            <button
              className="btn billing__btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Place Order"}
            </button>
            {error && <p className="billing__error">{error}</p>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default BillingShipping;
