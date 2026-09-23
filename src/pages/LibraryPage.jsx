import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOwnBooks, removeBook } from '../services/bookService'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import Header from '../components/Header'
import Menu from '../components/Menu'
import AddBookForm from '../components/AddBookForm'
import RecommendedMini from '../components/RecommendedMini'
import StatusDropdown from '../components/StatusDropdown'
import './LibraryPage.css'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All books' },
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

const LibraryPage = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBook, setSelectedBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getOwnBooks()
      setBooks(data)
    }
    fetchBooks()
  }, [])

  const openBookModal = (book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  const handleStartReading = () => {
    navigate('/reading')
  }

  const handleRemoveBook = async (bookId) => {
    try {
      await removeBook(bookId)
      toast.success('Book removed from your library')
      setBooks((prev) => prev.filter((book) => book._id !== bookId))
      closeModal()
    } catch (error) {
      const message =
        error.response?.data?.message || 'Could not remove the book'
      toast.error(message)
    }
  }

  const handleDelete = () => handleRemoveBook(selectedBook._id)
  const handleCardDelete = (book) => handleRemoveBook(book._id)

  const handleBookAdded = (newBook) => {
    setBooks((prev) => [newBook, ...prev])
  }

  const filteredBooks =
    statusFilter === 'all'
      ? books
      : books.filter((book) => book.status === statusFilter)

  return (
    <div className="library-page">
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      <div className="library-sidebar-panel">
        <AddBookForm onBookAdded={handleBookAdded} />
        <RecommendedMini />
      </div>
      <div className="library-panel">
        <div className="library-panel-header">
          <h2 className="library-panel-title">My library</h2>
          <StatusDropdown
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
        {filteredBooks.length === 0 ? (
          <div className="library-empty">
            <div className="library-empty-icon">📚</div>
            <p className="library-empty-text">
              To start training, add <span>some of your books</span> or from
              the recommended ones
            </p>
          </div>
        ) : (
          <ul className="library-book-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onClick={() => openBookModal(book)}
                onDelete={handleCardDelete}
              />
            ))}
          </ul>
        )}
      </div>
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAction={handleStartReading}
        actionLabel="Start reading"
        onSecondaryAction={handleDelete}
        secondaryLabel="Delete"
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default LibraryPage
