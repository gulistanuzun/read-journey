import './Filters.css'

const Filters = () => {
  return (
    <div className="filters-box">
      <span className="filters-label">Filters:</span>
      <div className="filters-field">
        <span className="filters-field-label">Book title:</span>
        <input className="filters-field-input" type="text" placeholder="Enter text" />
      </div>
      <div className="filters-field">
        <span className="filters-field-label">The author:</span>
        <input className="filters-field-input" type="text" placeholder="Enter text" />
      </div>
      <button className="filters-apply" type="button">
        To apply
      </button>
    </div>
  )
}

export default Filters
