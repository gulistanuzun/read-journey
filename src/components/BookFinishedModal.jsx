import Modal from 'react-modal'
import { FiX } from 'react-icons/fi'
import './BookFinishedModal.css'

Modal.setAppElement('#root')

const BookFinishedModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="book-finished-modal"
      overlayClassName="book-finished-modal-overlay"
    >
      <button className="book-finished-modal-close" onClick={onClose} type="button">
        <FiX size={22} />
      </button>
      <span className="book-finished-modal-emoji">📚</span>
      <h2 className="book-finished-modal-title">The book is read</h2>
      <p className="book-finished-modal-text">
        It was an <span>exciting journey</span>, where each page revealed new
        horizons, and the characters became inseparable friends.
      </p>
    </Modal>
  )
}

export default BookFinishedModal
