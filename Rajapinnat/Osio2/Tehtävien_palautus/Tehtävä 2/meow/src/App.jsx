import { useState } from "react";

const App = () => {
  const [facts, setFacts] = useState([])


  const RandomCatFact = () => {
    fetch("https://meowfacts.herokuapp.com/")
      .then((response) => response.json())
      .then((data) => setFacts(data.data))
      .then((facts) => console.log(facts));

  }
  return (
    <div>
      <h1>Cat Facts</h1>
      <button onClick={RandomCatFact}>Cat Fact</button>
      <ul>
        {facts.map((catfacts, index) => (
          <li key={index}>{catfacts}</li>
        ))}
      </ul>
      <p></p>
    </div>
  )
}
export default App