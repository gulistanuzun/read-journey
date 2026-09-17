import Modal from 'react-modal'

Modal.setAppElement('#root')

const BookModal = ({ book, isOpen, onClose, onAction, actionLabel }) => {
  if (!book) return null

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <button onClick={onClose}>X</button>
      <img src={book.imageUrl} alt={book.title} width="150" />
      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>{book.totalPages} pages</p>
      <button onClick={onAction}>{actionLabel}</button>
    </Modal>
  )
}

export default BookModal
