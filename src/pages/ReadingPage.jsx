import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiList, FiPieChart, FiTrash2 } from 'react-icons/fi'
import {
  getBookById,
  startReading,
  finishReading,
  removeDiaryEntry,
} from '../services/bookService'
import Header from '../components/Header'
import Menu from '../components/Menu'
import BookFinishedModal from '../components/BookFinishedModal'
import './ReadingPage.css'

const formatDate = (isoDate) => {
  const date = new Date(isoDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}.${month}.${date.getFullYear()}`
}

const ReadingPage = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const [activeTab, setActiveTab] = useState('diary')
  const [pageInput, setPageInput] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false)

  const fetchBook = async () => {
    const data = await getBookById(bookId)
    setBook(data)
  }

  useEffect(() => {
    fetchBook()
  }, [bookId])

  const progress = book?.progress || []
  const activeEntry = progress.find((entry) => !entry.finishReadingDate)
  const isReading = Boolean(activeEntry)
  const isBookDone = book?.status === 'done'

  const finishedEntries = progress.filter((entry) => entry.finishReadingDate)
  const totalPagesRead = finishedEntries.reduce(
    (sum, entry) => sum + (entry.finishReadingPage - entry.startReadingPage),
    0
  )
  const percentRead = book?.totalPages
    ? Math.min(100, (totalPagesRead / book.totalPages) * 100)
    : 0
  const lastEntry = finishedEntries[finishedEntries.length - 1]
  const lastPercent =
    lastEntry && book?.totalPages
      ? ((lastEntry.finishReadingPage - lastEntry.startReadingPage) /
          book.totalPages) *
        100
      : 0

  const totalMinutes = finishedEntries.reduce((sum, entry) => {
    const diffMs =
      new Date(entry.finishReadingDate) - new Date(entry.startReadingDate)
    return sum + diffMs / 60000
  }, 0)
  const avgSpeedPerHour =
    totalMinutes > 0 ? (totalPagesRead / totalMinutes) * 60 : 0
  const remainingPages = book ? book.totalPages - totalPagesRead : 0
  const remainingTimeLabel =
    avgSpeedPerHour > 0 && remainingPages > 0
      ? (() => {
          const hoursDecimal = remainingPages / avgSpeedPerHour
          const hours = Math.floor(hoursDecimal)
          const minutes = Math.round((hoursDecimal - hours) * 60)
          return `${hours} hours and ${minutes} minutes left`
        })()
      : null

  const handleToggleReading = async () => {
    const page = Number(pageInput) || 0
    try {
      if (!isReading) {
        await startReading({ id: bookId, page })
        setPageInput('')
        await fetchBook()
      } else {
        await finishReading({ id: bookId, page })
        setPageInput('')
        await fetchBook()
        if (book && page >= book.totalPages) {
          setIsFinishedModalOpen(true)
        }
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Could not update reading progress'
      toast.error(message)
    }
  }

  const handleDeleteEntry = async (readingId) => {
    try {
      await removeDiaryEntry(bookId, readingId)
      await fetchBook()
    } catch (error) {
      const message =
        error.response?.data?.message || 'Could not remove diary entry'
      toast.error(message)
    }
  }

  if (!book) {
    return (
      <div className="reading-page">
        <Header onMenuClick={() => setIsMenuOpen(true)} />
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    )
  }

  return (
    <div className="reading-page">
      <Header onMenuClick={() => setIsMenuOpen(true)} />

      <div className="reading-panel">
        <div className="reading-info-card">
          <div className="reading-control-section">
            <span className="reading-control-label">
              {isReading ? 'Stop page:' : 'Start page:'}
            </span>
            <div className="reading-control-input-row">
              <span className="reading-control-input-prefix">Page number:</span>
              <input
                className="reading-control-input"
                type="number"
                min="0"
                placeholder="0"
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
                disabled={isBookDone}
              />
            </div>
            <button
              className="reading-control-button"
              type="button"
              onClick={handleToggleReading}
              disabled={isBookDone}
            >
              {isReading ? 'To stop' : 'To start'}
            </button>
          </div>

          <div className="reading-info-header">
            <h3 className="reading-info-title">
              {progress.length === 0
                ? 'Progress'
                : activeTab === 'diary'
                  ? 'Diary'
                  : 'Statistics'}
            </h3>
            {progress.length > 0 && (
              <div className="reading-info-tabs">
                <button
                  type="button"
                  className={`reading-info-tab ${
                    activeTab === 'diary' ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveTab('diary')}
                  aria-label="Diary"
                >
                  <FiList size={16} />
                </button>
                <button
                  type="button"
                  className={`reading-info-tab ${
                    activeTab === 'statistics' ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveTab('statistics')}
                  aria-label="Statistics"
                >
                  <FiPieChart size={16} />
                </button>
              </div>
            )}
          </div>

          {progress.length === 0 ? (
            <div className="reading-progress-empty">
              <p className="reading-progress-empty-text">
                Here you will see when and how much you read. To record,
                click on the red button above.
              </p>
              <span className="reading-progress-empty-icon-circle">
                <span className="reading-progress-empty-icon">🌟</span>
              </span>
            </div>
          ) : activeTab === 'diary' ? (
            <ul className="reading-diary-list">
              {finishedEntries
                .slice()
                .reverse()
                .map((entry) => {
                  const pages = entry.finishReadingPage - entry.startReadingPage
                  const minutes = Math.round(
                    (new Date(entry.finishReadingDate) -
                      new Date(entry.startReadingDate)) /
                      60000
                  )
                  const percentage = book.totalPages
                    ? ((pages / book.totalPages) * 100).toFixed(1)
                    : '0.0'
                  const speed =
                    minutes > 0 ? Math.round(pages / (minutes / 60)) : pages
                  return (
                    <li className="reading-diary-entry" key={entry._id}>
                      <div className="reading-diary-entry-top">
                        <span className="reading-diary-entry-date">
                          {formatDate(entry.startReadingDate)}
                        </span>
                        <span className="reading-diary-entry-pages">
                          {pages} pages
                        </span>
                      </div>
                      <div className="reading-diary-entry-bottom">
                        <div className="reading-diary-entry-stats">
                          <span className="reading-diary-entry-percentage">
                            {percentage}%
                          </span>
                          <span className="reading-diary-entry-minutes">
                            {minutes} minutes
                          </span>
                        </div>
                        <div className="reading-diary-entry-bar-wrap">
                          <div className="reading-diary-entry-bar">
                            <div
                              className="reading-diary-entry-bar-fill"
                              style={{ width: `${Math.min(100, percentage)}%` }}
                            />
                          </div>
                          <span className="reading-diary-entry-speed">
                            {speed} pages per hour
                          </span>
                        </div>
                        <button
                          type="button"
                          className="reading-diary-entry-delete"
                          onClick={() => handleDeleteEntry(entry._id)}
                          aria-label="Delete entry"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </li>
                  )
                })}
            </ul>
          ) : (
            <div className="reading-statistics">
              <div className="reading-statistics-ring">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="rgba(249,249,249,0.1)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="rgba(88, 191, 108, 1)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={
                      2 * Math.PI * 60 * (1 - lastPercent / 100)
                    }
                    transform="rotate(-90 70 70)"
                  />
                </svg>
                <span className="reading-statistics-ring-label">
                  {Math.round(percentRead)}%
                </span>
              </div>
              <div className="reading-statistics-legend">
                <span className="reading-statistics-legend-dot" />
                <span className="reading-statistics-legend-text">
                  {lastPercent.toFixed(2)}%
                </span>
              </div>
              <span className="reading-statistics-total">
                {totalPagesRead} pages read
              </span>
            </div>
          )}
        </div>

        <div className="reading-summary-card">
          <div className="reading-summary-header">
            <h3 className="reading-summary-title">My reading</h3>
            {remainingTimeLabel && (
              <span className="reading-summary-time">
                {remainingTimeLabel}
              </span>
            )}
          </div>
          <img
            className="reading-summary-cover"
            src={book.imageUrl}
            alt={book.title}
          />
          <h4 className="reading-summary-book-title">{book.title}</h4>
          <p className="reading-summary-book-author">{book.author}</p>
          <button
            type="button"
            className={`reading-summary-button ${
              isReading ? 'is-reading' : ''
            } ${isBookDone ? 'is-done' : ''}`}
            onClick={handleToggleReading}
            disabled={isBookDone}
            aria-label={isReading ? 'Stop reading' : 'Start reading'}
          >
            <span className="reading-summary-button-icon" />
          </button>
        </div>
      </div>

      <BookFinishedModal
        isOpen={isFinishedModalOpen}
        onClose={() => setIsFinishedModalOpen(false)}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  )
}

export default ReadingPage
