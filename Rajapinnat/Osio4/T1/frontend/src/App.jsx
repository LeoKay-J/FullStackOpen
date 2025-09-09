import { useState } from 'react'

const App = () => {
  const [quotes, setQuotes] = useState([])
  const [newQuote, setNewQuote] = useState("")
  const [newAuthor, setNewAuthor] = useState("")

  const randomCodingQuote = async () => {
    const response = await fetch('http://localhost:3001/api/quotes/random')
    const data = await response.json()
    setQuotes(data)
  }
  const newQuotes = (event) => {
    event.preventDefault()

    const quoteInfo = {
      quote: newQuote,
      author: newAuthor
    }
    console.log(quoteInfo)

    fetch('http://localhost:3001/api/quotes', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setNewQuote("")
        setNewAuthor("")
      })
  }
  const handleNewQuote = (event) => {
    setNewQuote(event.target.value)
  }
  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
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
        <form onSubmit={newQuotes}>
          <input placeholder='-Quote-' value={newQuote} onChange={handleNewQuote} />
          <input placeholder='-Author-' value={newAuthor} onChange={handleNewAuthor} />
          <input value="submit" type="submit" />
        </form>

      </div>
    </div>
  )
}

export default App