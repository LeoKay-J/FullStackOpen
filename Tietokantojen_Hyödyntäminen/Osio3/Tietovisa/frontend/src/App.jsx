import React, { useState, useEffect } from "react"
import axios from 'axios'
import './app.css'

function App() {

  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [questionChoices, setQuestionChoices] = useState(null)
  const [questionChoicesToShow, setQuestionChoicesToShow] = useState(null)
  const [selectedCategory, setSelectedCategories] = useState("")
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState(0)
  const [gameState, setGameState] = useState("start")
  const [score, setScore] = useState(0)


  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data)
      })
  }, [])


  const quizStart = () => {
    axios.get('http://localhost:3000/questions/' + selectedCategory)
      .then((response) => {
        setQuestions(response.data)
        setGameState("quiz")
        setCurrentQuestionsIndex(0)
        console.log(response.data)
        let questionId = response.data[0].id


        axios.get('http://localhost:3000/choices/')
          .then((response) => {
            setQuestionChoices(response.data)
            console.log(response.data)
            console.log(questionId)
            setQuestionChoicesToShow(response.data.filter(choice => choice.question_id === questionId))
            console.log(response.data.filter(choice => choice.question_id === questionId))
          })
      })
  }

  const checkCorrectAnswer = () => {
    let nextIndex = currentQuestionIndex + 1
    setCurrentQuestionsIndex(nextIndex)
    setQuestionChoicesToShow(questionChoices.filter(choice => choice.question_id === questions[nextIndex].id))

    if (questionChoicesToShow.right_choice === true) {
      console.log("correct")
      setScore(score + 1)
    }
  }

  
  if (gameState === "start") {
    return (
      <div>
        <div className="HeaderStyle">
          <h1>Quiz</h1>
        </div>
        <div className="CategorySelect">
          <h2>Select category for quiz</h2>
          <select onChange={(e) => setSelectedCategories(e.target.value)}>
            <option>-select category-</option>
            {categories.map(categories => <option key={categories.categories}>{categories.categories}</option>)}
          </select>
          <button onClick={quizStart}>start quiz</button>
        </div>
      </div>
    )
  }

  if (gameState === "quiz" && questionChoicesToShow) {
    return (
      <div>
        <div className="QuizStarted">
          <h1>Your game has started</h1>
        </div>
        <div className="QuizQuestions">
          <h1>{questions[currentQuestionIndex].questions}</h1>
        </div>
        <div className="QuizButtons">
          <button onClick={checkCorrectAnswer} value={questionChoices.id}>{questionChoicesToShow[0].choice}</button>
          <button onClick={checkCorrectAnswer} value={questionChoices.id}>{questionChoicesToShow[1].choice}</button>
          <button onClick={checkCorrectAnswer} value={questionChoices.id}>{questionChoicesToShow[2].choice}</button>
        </div>
      </div>
    )
  }
}

export default App
