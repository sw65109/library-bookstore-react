import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login__page">
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="login__container">
              <h2 className="login__title">
                {isLogin ? "Login to Your Account" : "Create an Account"}
              </h2>
              <form className="login__form" autoComplete="off">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="login__input"
                    required
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  className="login__input"
                  required
                  autoComplete="off"
                />
                <input
                  type="password"
                  name="mock-password"
                  placeholder="Password"
                  className="login__input"
                  required
                  autoComplete="new-password"
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
