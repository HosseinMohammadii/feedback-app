import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FeedbackData from '../data/feedbackdata'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
    const [feedbacks, setFeedbacks] = useState(FeedbackData)

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    const addFeedback = (feedback) => {
        feedback.id = uuidv4()
        setFeedbacks([feedback, ...feedbacks])
        console.log(feedback);
    }

    const deleteFeedback = (id) => {
        if (window.confirm('Are you sure you wnat to delete?')) {
            setFeedbacks(feedbacks.filter((item) => item.id !== id ))
        }
    }

    const updateFeedback = (id, updItem) => {
        setFeedbacks(
            feedbacks.map((item) => (item.id === id ? { ...item, ...updItem } : item))
        )
    }

    const editFeedback = (item) => {
        setFeedbackEdit({item, edit: true})
    }

    const resetFeedbackEdit = () => {
        setFeedbackEdit({
            item: {},
            edit: false
        }
        )
    }

    return (
        <FeedbackContext.Provider
            value={{
                feedbacks,
                deleteFeedback,
                addFeedback,
                feedbackEdit,
                editFeedback,
                updateFeedback,
                resetFeedbackEdit,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    )
}

export default FeedbackContext