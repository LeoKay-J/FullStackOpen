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
      <p>Random coding quotes</p>
      <button onClick={randomCodingQuote}>Press for random coding quote</button>
      <p>{quotes.quote}</p>
      <p>{quotes.author}</p>
    </div>
  )
}

export default App