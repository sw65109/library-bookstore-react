import React, { useState } from "react";
import { auth } from "../firebase/init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  FaSpinner,
} from "react-icons/fa" // ✅ Centralized icon import

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) return;

    if (!isLogin && email !== confirmEmail) {
      alert("Emails don't match");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      await delay(isLogin ? 2500 : 3000);

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login attempted:", { email, password });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup attempted:", { fullName, email, password });
      }
    } catch (error) {
      console.log("Auth error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__page">
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="login__container">
              <h2 className="login__title">
                {isLogin ? "Login to Your Account" : "Create an Account"}
              </h2>
              <form
                className="login__form"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="login__input"
                    required
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="login__input"
                  required
                  autoComplete="off"
                  disabled={isLoading}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                {!isLogin && (
                  <input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm Email"
                    className="login__input"
                    required
                    autoComplete="off"
                    disabled={isLoading}
                    value={confirmEmail}
                    onChange={(event) => setConfirmEmail(event.target.value)}
                  />
                )}
                  <input
                    type="password"
                    name="mock-password"
                    placeholder="Password"
                    className="login__input"
                    required
                    autoComplete="off"
                    disabled={isLoading}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                {!isLogin && (
                    <input
                      type="password"
                      name="confirmMock-password"
                      placeholder="Confirm Password"
                      className="login__input"
                      required
                      autoComplete="off"
                      disabled={isLoading}
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                )}
                <button
                  className="btn login__btn demo-btn"
                  type="submit"
                  title="Demo only - no real login"
                  disabled={isLoading}
                >
                  {isLoading
                    ? isLogin
                      ? "Logging in..."
                      : "Signing up..."
                    : isLogin
                    ? "Login"
                    : "Sign Up"}
                </button>
              </form>

              {isLoading && (
                <div className="login__spinner">
                  <FaSpinner className="spinner" />
                </div>
              )}

              <p className="login__toggle">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="login__link"
                  onClick={() => setIsLogin((prev) => !prev)}
                  disabled={isLoading}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
