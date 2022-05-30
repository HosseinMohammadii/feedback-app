import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

import FeedbackContext from '../context/FeedbackContext'

function Feedbackform() {
    const { addFeedback, feedbackEdit, updateFeedback, resetFeedbackEdit } = useContext(FeedbackContext)

    const [text, setText] = useState()
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (feedbackEdit.edit === true) {
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
            setBtnDisabled(false)
        }
        // } else {
        //     setText('')
        //     setRating(10)
        //     setBtnDisabled(true)
        // }
    },
        [feedbackEdit])

    const handleTextChange = (e) => {
        let inputText = e.target.value

        if (inputText === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if (inputText !== '' && inputText.trim().length <= 10) {
            setMessage('Text must be at least 10 characters')
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
        setText(inputText)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim().length > 10) {
            const newFeedback = {
                text,
                rating
            }

            if (feedbackEdit.edit) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
            
            setText('')
            resetFeedbackEdit()
        }
        
    }

  return (
      <Card>
          <form onSubmit={handleSubmit}>
              <h2>How would you rate your service with us?</h2>
              <RatingSelect select={setRating} />
              <div className="input-group">
                  <input
                      onChange={handleTextChange}
                      type="text"
                      placeholder='Write your review'
                      value={text}
                  />
                  <Button type="submit" isDisabled={btnDisabled}>Send</Button>
              </div>
              {message && <div className='message'>{ message }</div>}
          </form>
    </Card>
  )
}

export default Feedbackform