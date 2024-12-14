import { useState } from "react";
import loginService from "../services/loginService";
import Palautelista from "../components/Palautelista";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(username, password);

    try {
      console.log(username, password);
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("väärät nimet");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div className="login-wrapper">
      <div className="login-card">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="login-card-wrapper">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-label-flex">
              <label htmlFor="">nimi:</label>
              <input
                type="text"
                value={username}
                name="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-label-flex">
              <label htmlFor="">salasana:</label>
              <input
                type="password"
                value={password}
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn">
              kirjaudu
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {!user && loginForm()}
      {user && <Palautelista />}
    </>
  );
};

export default Login;
