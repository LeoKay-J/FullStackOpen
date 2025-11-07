import React, { useState, useEffect } from "react"
import axios from 'axios'
import './app.css'
import { REALTIME_SUBSCRIBE_STATES } from "@supabase/supabase-js"

function App() {

  const [categories, setCategories] = useState([])
  const [questions, setQuestions] = useState([])
  const [questionChoices, setQuestionChoices] = useState([])
  const [selectedCategory, setSelectedCategories] = useState("")

  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)

  const [Answer, setAnswer] = useState("")


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
        setQuizStarted(true)
        setCurrentQuestionsIndex(0)
        console.log(response)

        axios.get('http://localhost:3000/choices' + selectedCategory)
          .then((response) => {
            setQuestionChoices(response.data)
          })
      })
  }

  const checkCorrectAnswer = () => {


  }

  const handleNextQuestion = () => {

  }


  if (quizStarted === false) {
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

  if (quizStarted === true) {
    return (
      <div>
        <div className="QuizStarted">
          <h1>YOUR GAME HAS STARTED</h1>
        </div>
        <div className="QuizQuestions">
          <h1>{questions[currentQuestionIndex].questions}</h1>
        </div>
        <div className="QuizButtons">
          <button onClick={checkCorrectAnswer} value="">{questionChoices[0].choice}</button>
          <button onClick={checkCorrectAnswer} value="">{questionChoices[1].choice}</button>
          <button onClick={checkCorrectAnswer} value="">{questionChoices[2].choice}</button>
        </div>
        <div className="NextQuestion">
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      </div>
    )
  }
}


export default App
