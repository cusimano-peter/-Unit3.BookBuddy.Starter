/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // State to hold the selected book

  const downloadBooks = async () => {
    try {
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setBooks(data.books);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    downloadBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book); // Update the selectedBook state to the clicked book
  };

  return (
    <div>
      {selectedBook ? (
        <div>
          <h2>{selectedBook.title}</h2>
          <p>Author: {selectedBook.author}</p>
          <img
            src={selectedBook.coverimage}
            alt={`Cover of ${selectedBook.title}`}
            style={{ width: "100px", height: "150px" }}
          />
          <p>{selectedBook.description}</p>
          <p>{selectedBook.available ? "Available" : "Checked Out"}</p>
          <button onClick={() => setSelectedBook(null)}>
            Back to Books List
          </button>
        </div>
      ) : books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            onClick={() => handleBookClick(book)}
            style={{ cursor: "pointer" }}
          >
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default Books;
