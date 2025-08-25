import { useState } from "react";

const App = () => {
  const [quote, setQuote] = useState([])


  const RandomCatFact = () => {
    fetch("https://meowfacts.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => setQuote(data.data))
      .then((quote) => console.log(quote));


  }
  return (
    <div>
      <h1>Cat Facts</h1>
      <button onClick={RandomCatFact}>Cat Fact</button>
      <ul>
        {quote.map((facts, index) => (
          <li key={index}>{facts}</li>
        ))}
      </ul>
      <p></p>
    </div>
  )
}
export default App