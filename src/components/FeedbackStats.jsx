
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
    const { feedbacks } = useContext(FeedbackContext)

    let average = feedbacks.reduce((acc, cur) => {
        return acc + cur.rating
    },
        0) / feedbacks.length
    
    average = isNaN(average) ? 0 : average
    average = average.toFixed(1).replace(/[.,]0$/, '')
    
  return (
      <div className='feedback-stats'>
          <h4>{feedbacks.length} Reviews</h4>
          <h4>Average Rating: {average}</h4>
    </div>
  )
}

export default FeedbackStats