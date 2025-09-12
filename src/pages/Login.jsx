import React, { useState, useEffect } from "react";
import { auth } from "../firebase/init";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  FaSpinner,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const SESSION_KEY = "demo_user_session";
const SESSION_DURATION = 20 * 60 * 1000;

function saveSession(email) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ email, loginTime: Date.now() })
  );
}

function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  if(!data) return null;
  const session = JSON.parse(data);
  if (Date.now() - session.loginTime > SESSION_DURATION) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return session;
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const[errorMSG, setErrorMSG] = useState("")

  useEffect(() => {
    function checkSession(){
      const session = getSession();
      if (session) {
        setUser(session.email);
      } else {
        setUser(null);
      }
    }

    checkSession();

    const interval = setInterval(checkSession, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

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
        saveSession(email);
        setUser(email);
        setErrorMSG("");
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        saveSession(email);
        setErrorMSG("")
        setUser(email);
        navigate("/")
      }
    } catch (error) {
      setErrorMSG(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearSession();
    setUser(null);
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
              {errorMSG && (
                <div className="login__error">{errorMSG}</div>
              )}
              {user ? (
                <div>
                  <p className="login__para">Welcome {user}</p>
                  <button className="btn login__btn" onClick={handleLogout}>Logout</button>
                </div>
              ) : (
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
              )}
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
