import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOwnBooks, removeBook } from '../services/bookService'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'

const LibraryPage = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleDelete = async () => {
    try {
      await removeBook(selectedBook._id)
      toast.success('Book removed from your library')
      setBooks((prev) => prev.filter((book) => book._id !== selectedBook._id))
      closeModal()
    } catch (error) {
      const message =
        error.response?.data?.message || 'Could not remove the book'
      toast.error(message)
    }
  }

  return (
    <div>
      <h1>Library Page</h1>
      {books.length === 0 ? (
        <p>Your library is empty</p>
      ) : (
        <ul>
          {books.map((book) => (
            <div key={book._id} onClick={() => openBookModal(book)}>
              <BookCard book={book} />
            </div>
          ))}
        </ul>
      )}
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAction={handleStartReading}
        actionLabel="Start reading"
        onSecondaryAction={handleDelete}
        secondaryLabel="Delete"
      />
    </div>
  )
}

export default LibraryPage
