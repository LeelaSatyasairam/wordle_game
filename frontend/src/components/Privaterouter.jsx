import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [verified, setVerified] = useState(null);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");
  const id = localStorage.getItem("personid");
  const API = "http://localhost:3000"; 

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${API}/details?username=${username}&id=${id}`);
        if (res.data?.data?.token === token) {
          setVerified(true);
        } else {
          alert("Token does not match");
          setVerified(false);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerified(false);
      }
    };

    verifyUser();
  }, [username, id, token]);

  if (verified === null) {
    return <p>Loading...</p>; 
  }

  return verified ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
