import React, { useState, useEffect } from "react"
import axios from 'axios'
import './app.css'

function App() {

  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])

  const [selectedCategory, setSelectedCategories] = useState("")





  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data);
      })
  }, [])

  const quizStart = () => {
    axios.get('http://localhost:3000/questions/' + selectedCategory)
      .then((response) => {
        setQuestions(response.data)
        console.log(questions)
      })

    if (selectedCategory) {
      return (
        <div className="QuizAnswerBox">
          <h2>Quiz</h2>
          <form>
            <input type="text" placeholder="--answer--" />
            <button>submit answer</button>
          </form>
          {questions.map(question => <li key={question.id}> {questions}</li>)}
        </div>
      )
    }
    else (selectedCategory = null) => {
      <div>
        <p>Please select category</p>
      </div>

    }
  }



  return (
    <div>
      <div className="HeaderStyle">
        <h1>Quiz</h1>
      </div>
      <div className="CategorySelect">
        <h2>Select category for quiz</h2>
        <select onChange={(e) => setSelectedCategories(e.target.value)}>
          <option>--select category--</option>
          {categories.map(categories => <option key={categories.categories}>{categories.categories}</option>)}
        </select>
        <button onClick={quizStart}>start quiz</button>
      </div>
    </div>

  )
}


export default App
