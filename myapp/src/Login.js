import { useCallback, useEffect, useState } from "react";
import Message from "./Message";

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const refreshpage = () => {
    window.location.reload(true);
  };
  const handleLoginClick = useCallback((e) => {
    e.preventDefault();
    const email = document.querySelector("#lemail").value;
    const password = document.querySelector("#lpassword").value;
    console.log(email);
    setError(null);
    console.log("handleclick");
    fetch("/login", {
      method: "POST",
      headers: {
        Authorization: "Bearer abcdxyz",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else {
          setUser(json.user);
          refreshpage();
        }
      });
  }, []);
  const handleLogout = useCallback(async () => {
    await fetch("/logout");
    setUser(null);
    setShowLoginForm(false);
    refreshpage();
  });
  const handleSignupClick = useCallback((e) => {
    e.preventDefault();
    setError(null);
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const username = document.querySelector("#username").value;
    console.log(email);
    fetch("/signup", {
      method: "POST",
      headers: {
        Authorization: "Bearer abcdxyz",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) setError(json.error);
        else {
          setUser(json.email);
          refreshpage();
        }
      });
  }, []);
  const ToggleMenu = useCallback(() => {
    document.querySelector(".popup-menu").classList.toggle("open");
  });
  useEffect(() => {
    requestUser();
    async function requestUser() {
      fetch("/login")
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setUser(json.user);
        });
    }
  }, []);

  if (user)
    return (
      <li className="logged-in-user">
        <button className="login-button" onClick={() => ToggleMenu()}>
          {user}
        </button>
        <div className="popup-menu">
          <button
            id="logout"
            onClick={() => {
              handleLogout();
            }}
          >
            <i class="bi bi-box-arrow-right"></i>{" "}
          </button>
        </div>
      </li>
    );
  return (
    <>
      <button className="login-button" onClick={() => setShowLoginForm(true)}>
        Login
      </button>

      {showLoginForm && (
        <div className="login-form">
          <div>
            <p>Welcome to MMDB!</p>
            <button
              id="close-form"
              onClick={() => {
                setShowLoginForm(false);
                setError(null);
              }}
            >
              X
            </button>
            <div className="input-block">
              <label className="input-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="lemail"
                placeholder="E-mail"
                required
              />
            </div>
            <div className="input-block">
              <label className="input-label" htmlFor="password">
                Password{" "}
              </label>
              <input
                type="text"
                name="password"
                id="lpassword"
                placeholder="Password"
                required
              />
              {error && <Message message={error} className="login-error" />}
            </div>

            <button
              type="submit"
              id="Lsubmit"
              onClick={(e) => handleLoginClick(e)}
            >
              Submit
            </button>

            <p>
              {" "}
              Don't have an account?{" "}
              <a
                onClick={() => {
                  setShowLoginForm(false);
                  setShowSignupForm(true);
                }}
              >
                Signup now
              </a>
            </p>
          </div>
        </div>
      )}

      {showSignupForm && (
        <div className="login-form">
          <div>
            <p>Welcome to MMDB!</p>
            <button
              id="close-form"
              onClick={() => {
                setShowSignupForm(false);
                setError(null);
              }}
            >
              X
            </button>
            <div className="input-block">
              <label className="input-label" htmlFor="email">
                {"E-mail"}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                required
              />
            </div>
            <div className="input-block">
              <label htmlFor="username" className="input-label">
                {"Username"}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="password" className="input-label">
                {"Password"}
              </label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="password"
                required
              />
              {error && <Message message={error} className="login-error" />}
            </div>

            <button
              type="submit"
              id="Ssubmit"
              onClick={(e) => handleSignupClick(e)}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
