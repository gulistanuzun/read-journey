import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import './BookAddedModal.css'

Modal.setAppElement('#root')

const BookAddedModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="book-added-modal"
      overlayClassName="book-added-modal-overlay"
    >
      <button className="book-added-modal-close" onClick={onClose} type="button">
        <FiX size={22} />
      </button>
      <span className="book-added-modal-emoji">👍</span>
      <h2 className="book-added-modal-title">Good job</h2>
      <p className="book-added-modal-text">
        Your book is now in <span>the library!</span> The joy knows no bounds
        and now you can start your training
      </p>
    </Modal>
  )
}

export default BookAddedModal
