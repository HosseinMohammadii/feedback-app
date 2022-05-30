import {motion, AnimatePresence} from 'framer-motion'
import FeedbackContext from '../context/FeedbackContext'
import FeedbackItem from './FeedbackItem'
import {useContext } from 'react'

function FeedbackList({ handleDelete }) {
    const { feedbacks } = useContext(FeedbackContext)
    
    if (!feedbacks || feedbacks.lenght === 0) {
        return (<p> No feedback yet.</p>)
    }


  return (
      <div className="feedback-list">
          <AnimatePresence>
              {feedbacks.map((item) => (
                  <motion.div
                      key={item.id}
                      initial={{ opacity:0 }}
                      animate={{ opacity:1 }}
                      exit={{ opacity:0 }}
                      
                  >
                  <FeedbackItem
                        key={item.id}
                        item={item} />
            </motion.div>
            ))}
        </AnimatePresence>
    </div>
)

//   return (
//       <div className="feedback-list">
//           {feedbacks.map((item) =>
//           (<FeedbackItem
//               key={item.id}
//               item={item}
//               handleDelete={handleDelete}
//           />))}
          
//     </div>
//   )
}


export default FeedbackList