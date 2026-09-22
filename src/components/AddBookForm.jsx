import { useState } from 'react'
import { toast } from 'react-toastify'
import { addBook } from '../services/bookService'
import './AddBookForm.css'

const AddBookForm = ({ onBookAdded }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [totalPages, setTotalPages] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBook = await addBook({
        title,
        author,
        totalPages: Number(totalPages),
      })
      toast.success('Book added to your library')
      setTitle('')
      setAuthor('')
      setTotalPages('')
      onBookAdded?.(newBook)
    } catch (error) {
      const message = error.response?.data?.message || 'Could not add the book'
      toast.error(message)
    }
  }

  return (
    <form className="add-book-box" onSubmit={handleSubmit}>
      <span className="add-book-label">Add book:</span>
      <div className="add-book-field">
        <span className="add-book-field-label">Book title:</span>
        <input
          className="add-book-field-input"
          type="text"
          placeholder="Enter text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="add-book-field">
        <span className="add-book-field-label">The author:</span>
        <input
          className="add-book-field-input"
          type="text"
          placeholder="Enter text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
        />
      </div>
      <div className="add-book-field">
        <span className="add-book-field-label">Number of pages:</span>
        <input
          className="add-book-field-input"
          type="number"
          placeholder="Enter text"
          value={totalPages}
          onChange={(event) => setTotalPages(event.target.value)}
          required
          min="1"
        />
      </div>
      <button className="add-book-submit" type="submit">
        Add book
      </button>
    </form>
  )
}

export default AddBookForm
