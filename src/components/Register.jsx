/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(""); // To display messages to the user

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to check if both passwords match
  const passwordsMatch =
    formData.password && formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Before submitting, check if passwords match
    if (!passwordsMatch) {
      setMessage("Passwords do not match. Please try again.");
      return; // Stop the form submission if passwords don't match
    }

    try {
      console.log("HERE");
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      console.log("response", response);
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        localStorage.setItem("token", result.token); // Store token
        setMessage("Registration successful!"); // Success message
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }); // Reset form
      } else {
        setMessage(result.message || "An error occurred during registration."); // Error handling
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("An error occurred during registration."); // Error handling
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordsMatch && formData.confirmPassword && (
            <p style={{ color: "red" }}>Passwords do not match.</p>
          )}
        </div>
        <button type="submit" disabled={!passwordsMatch}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
