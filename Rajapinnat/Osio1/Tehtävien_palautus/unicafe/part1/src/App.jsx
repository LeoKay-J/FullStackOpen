import { useState } from 'react'

const StatisticLine =({text, value}) => {
  return <p>{text}: {value}</p>
}

const Statistics = ({good, neutral, bad}) => {


     const Good = good
     const Neutral = neutral
     const Bad = bad
     const All = good + neutral + bad
     const Average = (good * 1 + neutral * 0 + bad * -1)/(good + neutral + bad)
     const Positive = good /(good + neutral + bad)
      
     if (All === 0){
      return(
      "No Feedback Given"
      )
    }
     

     return (
        <div>
          <table>
            <tbody>
              <tr>
                <td>Good: {good}  </td>
              </tr>
              <tr>
                <td>Neutral: {neutral}  </td>
              </tr>
              <tr>
                <td>Bad: {bad}  </td>
              </tr>
              <tr>
                <td>All: {All}  </td>
              </tr>
              <tr>
                <td>Average: {Average}  </td>
              </tr>
              <tr>
                <td>Positive: {Positive}  </td>
              </tr>
            </tbody>

          </table>
        </div>
     )
    
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App