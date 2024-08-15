import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout({ setAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await axios.get("http://localhost:8080/logout", {
          withCredentials: true,
        });
        setAuthenticated(false);
        navigate("/"); // Redirect to home page
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    handleLogout();
  }, [setAuthenticated, navigate]);

  return null; // This component doesn't render anything
}

export default Logout;
