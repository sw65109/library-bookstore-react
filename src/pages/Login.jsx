import React, { useState } from "react";
import { auth } from "../firebase/init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!email || !password) return;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login attempted:", {email, password});
      }
      else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Signup attempted:", {fullName, email, password});
      }
    } catch (error) {
      console.log("Auth error", error.message)
    }
  }

  return (
    <div className="login__page">
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="login__container">
              <h2 className="login__title">
                {isLogin ? "Login to Your Account" : "Create an Account"}
              </h2>
              <form className="login__form" autoComplete="off" onSubmit={handleSubmit}>
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
                  placeholder="Email"
                  className="login__input"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  type="password"
                  name="mock-password"
                  placeholder="Password"
                  className="login__input"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button 
                className="btn login__btn demo-btn" 
                type="submit"
                title="Demo only - no real login"
                disabled
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
              <p className="login__toggle">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  className="login__link"
                  onClick={() => setIsLogin((prev) => !prev)}
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
