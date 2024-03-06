/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => setBook(data))
    .catch(error => console.error(`Error fetching book with ID ${bookId}:`, error));
  }, [bookId]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <img src={book.coverimage} alt={`Cover of ${book.title}`} style={{ width: '100px', height: '150px' }} />
      <p>{book.description}</p>
      <p>{book.available ? 'Available' : 'Checked Out'}</p>
    </div>
  );
}

const toggleBookAvailability = (bookId, currentStatus) => {
    fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify({
        available: !currentStatus,
      }),
    })
    .then(response => response.json())
    .then(updatedBook => {
      console.log('Book updated:', updatedBook);
    })
    .catch(error => console.error(`Error updating book with ID ${bookId}:`, error));
  };
  

export default SingleBook;


