import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) {
      setError("Please enter a book title");
      return;
    }
    setError("");
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();
      setBooks(data.docs.slice(0, 10)); // show top 10 results
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1>📚 Book Finder</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="book-list">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/150"
              }
              alt={book.title}
            />
            <h3>{book.title}</h3>
            <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
