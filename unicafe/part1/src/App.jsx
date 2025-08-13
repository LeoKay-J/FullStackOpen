import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
     const Good = good
     const Neutral = neutral
     const Bad = bad
     const All = good + neutral + bad
     const Average = (good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)
     const Positive = good /(good + neutral + bad)

     return (
        <div>
            <p>Good: {good}</p>
            <p>Neutral: {Neutral}</p>
            <p>Bad: {Bad}</p>
            <p>All: {All}</p>
            <p>Average: {Average}</p>
            <p>Positive: {Positive}</p>
        </div>
     )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App