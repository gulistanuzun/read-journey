import './BookCard.css'

const BookCard = ({ book, onClick }) => {
  return (
    <li className="book-card" onClick={onClick}>
      <img className="book-card-cover" src={book.imageUrl} alt={book.title} />
      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-author">{book.author}</p>
      </div>
    </li>
  )
}

export default BookCard
