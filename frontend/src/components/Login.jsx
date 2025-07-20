import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const message = "✅Login successful ✅";
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/login`, { username, password });
      const token = response.data.data[0].token;
      const name = response.data.data[0].username;
      const personid = response.data.data[0].personid;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("personid", personid);
        setShowPopup(true);
        setTimeout(() => {
          navigation("/wordle");
          setUsername("");
          setPassword("");
        }, 1000);
      }

    } catch (error) {
      console.error(error);
      setNote("Please enter correct credentials");
    }
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const { email, name, iss } = decoded;
    const password = name.replace(/\s+/g, ""); // remove inner spaces
    const part = iss.split(".");
    const login_method = part.slice(1, 2)[0]; // usually 'google'

    // console.log("Google Login Info →", { email, password, login_method });

    try {
      const res = await axios.post(`${API}/google-login`, {
        username: email,
        password,
        login_method,
      });

      const user = res.data.data;

      const token = user.token;
      const username = user.username;
      const personid = user.personid;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", username);
        localStorage.setItem("personid", personid);
        setShowPopup(true);
        setTimeout(() => {
          navigation("/wordle");
        }, 1000);
      }
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      alert("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="login">
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <h1>Welcome</h1>
          <div className="username-section">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              placeholder="Please enter username"
            />
          </div>
          <div className="password-section">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              placeholder="Please enter password"
            />
          </div>
          <div className="button-section">
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigation('/register')}>Register</button>
          </div>
        </form>

        <p style={{ textAlign: "center" }}>or login using</p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
          />
        </div>
        <p style={{ textAlign: "center" }}>For new users, register first</p>
        {note && <p style={{ color: "red", textAlign: "center" }}>{note}</p>}
      </div>
      {showPopup && (
        <div className="popupcontainer">
          <div className="popup">
            <h3>{message}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
