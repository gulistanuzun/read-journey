import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {
  getRecommendedBooks,
  getBookById,
  addBookFromRecommended,
} from '../services/bookService'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Filters from '../components/Filters'
import StartWorkoutCard from '../components/StartWorkoutCard'
import './RecommendedPage.css'

const RecommendedPage = () => {
  const [books, setBooks] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedBook, setSelectedBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getRecommendedBooks(page, 10)
      setBooks(data.results)
      setTotalPages(data.totalPages)
    }
    fetchBooks()
  }, [page])

  const openBookModal = async (id) => {
    const book = await getBookById(id)
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  const handleAddToLibrary = async () => {
    try {
      await addBookFromRecommended(selectedBook._id)
      toast.success('Book added to your library')
      closeModal()
    } catch (error) {
      const message =
        error.response?.data?.message || 'Could not add the book'
      toast.error(message)
    }
  }

  return (
    <div className="recommended-page">
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <div className="recommended-sidebar-panel">
        <Filters />
        <StartWorkoutCard />
      </div>
      <div className="recommended-panel">
        <div className="recommended-panel-header">
          <h2 className="recommended-panel-title">Recommended</h2>
          <div className="recommended-panel-nav">
            <button
              className="recommended-nav-button"
              type="button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              className="recommended-nav-button"
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
        <ul className="recommended-book-grid">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={() => openBookModal(book._id)}
            />
          ))}
        </ul>
      </div>
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAction={handleAddToLibrary}
        actionLabel="Add to library"
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default RecommendedPage
