const BookCard = ({ book }) => {
  return (
    <li>
      <img src={book.imageUrl} alt={book.title} width="150" />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </li>
  )
}

export default BookCard
