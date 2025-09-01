import { useState } from 'react'


const App = () => {
  const [triviaGategories, setTriviaGategories] =useState("")
  const [selectedGategories, setSelectedGategories]

  const getTriviaCategories = () => {
    fetch(`https://opentdb.com/api.php?amount=10`)
    .then((response) => (response.json))
    .then((data) => (setTriviaGategories(data)))
  }

  return (
    <div>
      <div>
        <h1>Trivia  </h1>
        <h3>Select number of questions </h3>
        <select>
          <option></option>
        </select>


        <h3>Select gategory</h3>
        <select>
          <option></option>
        </select>


        <h3>Select difficulty</h3>
        <select>
          <option>-Any difficulty-</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>


        <h3>Select type</h3>
        <select>
          <option>-Select type-</option>
          <option>Mutliple choice</option>
          <option>True / false</option>
        </select>


      </div>
    </div>
  )
}

export default App
