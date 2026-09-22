import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import './BookModal.css'

Modal.setAppElement('#root')

const BookModal = ({
  book,
  isOpen,
  onClose,
  onAction,
  actionLabel,
  onSecondaryAction,
  secondaryLabel,
}) => {
  if (!book) return null

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="book-modal"
      overlayClassName="book-modal-overlay"
    >
      <button className="book-modal-close" onClick={onClose} type="button">
        <FiX size={22} />
      </button>
      <img className="book-modal-cover" src={book.imageUrl} alt={book.title} />
      <h2 className="book-modal-title">{book.title}</h2>
      <p className="book-modal-author">{book.author}</p>
      <p className="book-modal-pages">{book.totalPages} pages</p>
      <div className="book-modal-actions">
        <button className="book-modal-button" onClick={onAction} type="button">
          {actionLabel}
        </button>
        {onSecondaryAction && (
          <button
            className="book-modal-button"
            onClick={onSecondaryAction}
            type="button"
          >
            {secondaryLabel}
          </button>
        )}
      </div>
    </Modal>
  )
}

export default BookModal
