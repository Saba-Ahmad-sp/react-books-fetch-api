import React, { useState, useEffect } from "react";


// Sample API URL (replace with your actual API endpoint)
const API_URL = "https://json.extendsclass.com/bin/b5f4ef4c4d73";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState({});

  // Fetch books data from an external API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };

    fetchBooks();
  }, []);

  // Toggle like status for a book
  const toggleLike = (bookId) => {
    setLikedBooks((prevLikedBooks) => ({
      ...prevLikedBooks,
      [bookId]: !prevLikedBooks[bookId],
    }));
  };

  return (
    <div className="container max-w-full p-6 bg-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Web Development Books</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mr-4 ml-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gray-600 border border-black rounded-lg shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-58 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">{book.title}</h2>
                <p className="text-white text-sm mb-4">{book.features}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => toggleLike(book.id)}
                  className={`text-2xl transform transition-transform duration-200 ${
                    likedBooks[book.id] ? "scale-125 text-red-500" : "scale-100 text-gray-400"
                  }`}
                >
                  {likedBooks[book.id] ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
