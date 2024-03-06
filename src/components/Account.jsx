/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import React, { useState, useEffect } from 'react';

function Account() {
  const [userData, setUserData] = useState(null);
  // Directly get the token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch('/api/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        // Check for errors or if the token is invalid, handle accordingly
        if (!data.error) {
          setUserData(data);
        } else {
          // Handle error, e.g., invalid token. Perhaps clear it from localStorage
          console.log(data.message); // Example error handling
          localStorage.removeItem('token'); // Consider removing the invalid token
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Optionally clear token if there's a fetch error, indicating token might be invalid
        localStorage.removeItem('token');
      });
    }
  }, [token]);

  if (!token) {
    return (
      <div>
        <p>You must be logged in to view account details.</p>
        <p><a href="/login">Log In</a> | <a href="/register">Create an Account</a></p>
      </div>
    );
  }

  // If userData is null, it means the data is still loading
  if (!userData) {
    return <p>Loading account details...</p>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      <p>First Name: {userData.firstname}</p>
      <p>Last Name: {userData.lastname}</p>
      <p>Email: {userData.email}</p>
      {userData.books && (
        <>
          <h3>Checked-out Books:</h3>
          <ul>
            {userData.books.map((book) => (
              <li key={book.id}>{book.title} by {book.author}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Account;
