import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import './StatusDropdown.css'

const StatusDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className="status-dropdown" ref={containerRef}>
      <button
        type="button"
        className="status-dropdown-button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedOption?.label}</span>
        <FiChevronDown
          size={16}
          className={`status-dropdown-icon ${isOpen ? 'is-open' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className="status-dropdown-list">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`status-dropdown-option ${
                  option.value === value ? 'is-selected' : ''
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StatusDropdown
