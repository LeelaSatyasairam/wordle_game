
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

export default function Register(){
 const navigation = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [note, setNote] = useState("");
   const API = process.env.REACT_APP_API_URL;

    const handleregister = async (e)=>{
      e.preventDefault();
    try {
      await axios.post(`${API}/register`, { username, password })
      alert("user register succesfull");
      navigation("/");
    } catch (error) {
      console.error("Error in register :", error)
      setNote("Please enter a unique username & password should have aleast 10 characters"); 
    }
    }
    return(
    <div className="login">
      <div className="form-section">
        <form onSubmit={handleregister}>
          <h1>Registration</h1>
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
            <button type="submit">register</button>
            <button type="button" onClick={() => navigation('/')}>cancel</button>
          </div>
        </form>
           {note && <p className="note m-1.5">{note}</p>}
      </div>

    </div>
    )
}