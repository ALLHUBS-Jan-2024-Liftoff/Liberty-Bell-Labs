import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.jpg'; // Adjust path if necessary

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        {
          username,
          password,
          verifyPassword
        },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '150px' }} />
              </div>
              <h2 className="text-center mb-4">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="verifyPassword" className="form-label">Verify Password</label>
                  <input
                    type="password"
                    id="verifyPassword"
                    className="form-control"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>
              <div className="text-center mt-3">
                {message === 'Given user details are successfully registered' && (
                  <p className="text-success">Registration successful. Click <a href="/login" className="text-primary">here</a> to login.</p>
                )}
                {message === 'User Already Exists.' && (
                  <p className="text-danger">{message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
