/* TODO - add your code to create a functional React component that renders a registration form */
import React, { useState } from 'react';

function Registration() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful', data);
        // do something with the received token,
        // localStorage?
      } else {
        console.error('Registration failed', data);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={formData.firstname}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={formData.lastname}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Registration;
