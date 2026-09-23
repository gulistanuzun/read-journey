import { FiTrash2 } from 'react-icons/fi'
import './BookCard.css'

const BookCard = ({ book, onClick, onDelete }) => {
  const handleDeleteClick = (event) => {
    event.stopPropagation()
    onDelete?.(book)
  }

  return (
    <li className="book-card" onClick={onClick}>
      <img className="book-card-cover" src={book.imageUrl} alt={book.title} />
      <div className="book-card-row">
        <div className="book-card-info">
          <h3 className="book-card-title">{book.title}</h3>
          <p className="book-card-author">{book.author}</p>
        </div>
        {onDelete && (
          <button
            className="book-card-delete"
            onClick={handleDeleteClick}
            type="button"
            aria-label="Delete book"
          >
            <FiTrash2 size={14} />
          </button>
        )}
      </div>
    </li>
  )
}

export default BookCard
