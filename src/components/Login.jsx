/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const loginEndpoint =
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login";

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("token", data.token); // Store the token

      if (onLoginSuccess) {
        onLoginSuccess(data);
      }

      navigate("/account"); // Use navigate to redirect to the account page
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
