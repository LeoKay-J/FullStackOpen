import { useState, useEffect } from 'react'

const TriviaGame = (questions) => {
  console.log(questions)
  return (
    <div>
      <h2>Questions {questions[0].question}</h2>
      <button></button>
      <button></button>
      <button></button>
      <button></button>
    </div>
  )
}

const App = () => {
  /*statit*/
  const [categories, setCategories] = useState([])
  const [difficulty, setDifficulty] = useState([])
  const [type, setType] = useState([])
  const [questions, setQuestions] = useState([])
  /*selected statit*/
  const [selectedAmount, setSelectedAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [selectedType, setSelectedType] = useState("")
  /*Trivia aktivointi*/
  const [gameActive, setGameActive] = useState(false)



  useEffect(() => {
    fetch(`https://opentdb.com/api_category.php`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.trivia_categories);
      })
  }, [])

  const handleAmountChange = (event) => {
    const amount = event.target.value
    setSelectedAmount(amount)
  }
  const handleCategoryChange = (event) => {
    const categories = event.target.value
    setSelectedCategory(categories)
  }
  const handleDificultyChange = (event) => {
    const difficulty = event.target.value
    setSelectedDifficulty(difficulty)
  }
  const handleTypeChange = (event) => {
    const type = event.target.value
    setSelectedType(type)
  }

  const startTriviaGame = () => {
    fetch(`https://opentdb.com/api.php?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results)
        setGameActive(true)
      })
  }

  if (gameActive) {
    return (
      <TriviaGame questions={questions} />
    )
  } 
  /* */
  return (
    <div>
      <div>
        <h1>Trivia</h1>
        <h3>Select number of questions</h3>
        <input value={amount} onChange={handleAmountChange} min={1} max={50} />

        <h3>Select gategory</h3>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option>-Select gategory-</option>
          {categories.map((categories) => (
            <option key={categories.id} value={categories}>{categories.name}</option>
          ))}
        </select>

        <h3>Select difficulty</h3>
        <select value={selectedDifficulty} onChange={handleDificultyChange}>
          <option >-Any difficulty-</option>
          <option value={easy}>Easy</option>
          <option value={medium}>Medium</option>
          <option value={hard}>Hard</option>
        </select>

        <h3>Select type</h3>
        <select value={selectedType} onChange={handleTypeChange}>
          <option >-Select type-</option>
          <option value={multipleChoice}>Mutliple choice</option>
          <option value={boolean}>True / false</option>
        </select>

        <h2>Start Trivia!</h2>
        <button onClick={startTriviaGame}>Start</button>
      </div>
    </div>
  )
}

export default App