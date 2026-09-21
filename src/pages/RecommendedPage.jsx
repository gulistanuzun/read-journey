import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
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
    <div>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <Filters />
      <h1>Recommended Page</h1>
      <ul>
        {books.map((book) => (
          <div key={book._id} onClick={() => openBookModal(book._id)}>
            <BookCard book={book} />
          </div>
        ))}
      </ul>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
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
