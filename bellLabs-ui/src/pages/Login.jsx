import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setAuthenticated(true);
      setMessage(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button> 
        <div className="mb-3">
            <p>Don't have an account? <a href="/register">Create one.</a></p>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;