import { Link } from 'react-router-dom'
import './StartWorkoutCard.css'

const StartWorkoutCard = () => {
  return (
    <div className="start-workout">
      <h3 className="start-workout-title">Start your workout</h3>
      <ol className="start-workout-steps">
        <li className="start-workout-step">
          <span className="start-workout-step-number">1</span>
          <p className="start-workout-step-text">
            <span className="start-workout-step-highlight">
              Create a personal library:
            </span>{' '}
            add the books you intend to read to it.
          </p>
        </li>
        <li className="start-workout-step">
          <span className="start-workout-step-number">2</span>
          <p className="start-workout-step-text">
            <span className="start-workout-step-highlight">
              Create your first workout:
            </span>{' '}
            define a goal, choose a period, start training.
          </p>
        </li>
      </ol>
      <Link className="start-workout-link" to="/library">
        <span>My library</span>
        <span className="start-workout-arrow" />
      </Link>
    </div>
  )
}

export default StartWorkoutCard
