import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRecommendedBooks } from '../services/bookService'
import BookCard from './BookCard'
import './RecommendedMini.css'

const RecommendedMini = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getRecommendedBooks(1, 3)
      setBooks(data.results.slice(0, 3))
    }
    fetchBooks()
  }, [])

  return (
    <div className="recommended-mini">
      <h3 className="recommended-mini-title">Recommended books</h3>
      <ul className="recommended-mini-grid">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </ul>
      <Link className="recommended-mini-link" to="/recommended">
        <span>Home</span>
        <span className="recommended-mini-arrow" />
      </Link>
    </div>
  )
}

export default RecommendedMini
