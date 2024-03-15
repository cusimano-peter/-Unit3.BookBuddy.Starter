import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function SingleBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const token = localStorage.getItem("token");

  const fetchBookDetails = useCallback(async () => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error(`Error fetching book with ID ${bookId}:`, error);
    }
  }, [bookId, token]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const handleCheckout = async (event) => {
    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            available: false,
          }),
        }
      );
      if (response.ok) {
        const updatedBook = await response.json();
        setBook(updatedBook);
      } else {
        console.error("Failed to update book availability.");
      }
    } catch (error) {
      console.error(`Error updating book with ID ${bookId}:`, error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <img
        src={book.coverimage}
        alt={`Cover of ${book.title}`}
        style={{ width: "100px", height: "150px" }}
      />
      <p>{book.description}</p>
      <p>{book.available ? "Available" : "Checked Out"}</p>
      {token && book.available && (
        <button onClick={handleCheckout}>Check Out</button>
      )}
    </div>
  );
}

export default SingleBook;
