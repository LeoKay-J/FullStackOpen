import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


const Statistics = () => {

    const good = good
    const neutral = neutral
    const bad = bad
    const all = good + neutral + bad
    const average = (good * 1 + neutral * 0 + bad * -1 ) / (good + neutral + bad)
    const positive = good / (good + neutral + bad)*100


  
  
}


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1) }>Bad</button>

      <p></p>
      </div>
  )
}

export default App