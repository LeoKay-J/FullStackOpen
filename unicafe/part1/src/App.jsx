import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


const Statistics = {good, neutral, bad} => {
 
     const Good = good
     const Neutral = neutral
     const Bad = bad
     const All = good + neutral + bad
     const Average = (good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)
     const Positive = good /(good + neutral + bad)

     
    return(
      <div>
        <p>Good: (Good)</p>
        <p>neutral: (Neutral)</p>
        <p>bad: (Bad)</p>
        <p>all: (All)</p>
        <p>average: (Average)</p>
        <p>positive: (Positive) </p>
      </div>
    )
}


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1) }>Bad</button>

      <Statistic good={good} neutral={neutral} bad={bad} all={good + neutral + bad} />
    

     </div>
  )
}

export default App