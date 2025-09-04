import { useState } from 'react'

const App = () => {
  const [quotes, setQuotes] = useState([])

  const randomCodingQuote = async () => {
    const response = await fetch('http://localhost:3001/api/quotes/random')
    const data = await response.json()
    setQuotes(data)
  }

  return (
    <div>
      <div>
        <h3>Random coding quotes</h3>
        <button onClick={randomCodingQuote}>Press for random coding quote</button>
        <p>"{quotes.quote}"</p>
        <p>-{quotes.author}</p>
      </div>
      <div>
        <h3>Add quote</h3>
        <form>
          <input placeholder='-Quote-'/>
          <input placeholder='-Author-'/>
          <input type="submit" value="Submit"/>
        </form>
        
      </div>
    </div>
  )
}

export default App