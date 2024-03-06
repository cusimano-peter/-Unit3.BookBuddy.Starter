/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import React, { useEffect, useState } from 'react';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => setBooks(data))
    .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      {books.length > 0 ? (
        books.map(book => (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ width: '100px', height: '150px' }} />
            <p>{book.description}</p>
            <p>{book.available ? 'Available' : 'Checked Out'}</p>
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
}

export default Books;



