import React, { useState, useEffect } from "react"
import axios from 'axios'
import './app.css'


function App() {

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategories] = useState("")

  const [questions, setQuestions] = useState([])
  const [questionChoices, setQuestionChoices] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState(0)
  const [questionChoicesToShow, setQuestionChoicesToShow] = useState(null)

  const [records, setRecords] = useState([])
  const [gameState, setGameState] = useState("highscore-end")
  const [score, setScore] = useState(1)
  const [highscore, setHighscore] = useState([])

  const [newUsername, setNewUsername] = useState("")


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

  const saveHighScore = (event) => {
    event.preventDefault()

    const newUserInfo = {
      username: newUsername,
      score: score
    }

    axios.post('http://localhost:3000/records', newUserInfo)
      .then((response) => {
        setNewUsername("")
        setRecords(records.concat(response.data))
      })
  }


  const checkCorrectAnswer = (event) => {
    var correctChoice = questionChoicesToShow.filter(correctAnswer => correctAnswer.right_choice)


    if (Number(event.target.value) === correctChoice[0].id) {
      setScore(score + 1)
    }

    let nextIndex = currentQuestionIndex + 1
    setCurrentQuestionsIndex(nextIndex)
    setQuestionChoicesToShow(questionChoices.filter(choice => choice.question_id === questions[nextIndex].id))
    console.log(score)
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
        <div>
          <h2>Highscore</h2>
          <div>
            <ul>
              <li></li>
            </ul>
          </div>
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
          <button onClick={checkCorrectAnswer} value={questionChoicesToShow[0].id}>{questionChoicesToShow[0].choice}</button>
          <button onClick={checkCorrectAnswer} value={questionChoicesToShow[1].id}>{questionChoicesToShow[1].choice}</button>
          <button onClick={checkCorrectAnswer} value={questionChoicesToShow[2].id}>{questionChoicesToShow[2].choice}</button>
        </div>
      </div>
    )
  }
  if (gameState === "end") {
    return (
      <div>
        <h1>Return to start</h1>
        <div>
          <button onClick={setGameState("start")}></button>
        </div>
      </div>
    )


  }
  if (gameState === "highscore-end") {

    return (
      <div>
        <div>
          <h1>Save highscore</h1>
          <form>
            <input onChange={(e) => e.target.value} value={newUsername} placeholder="username"></input>
            <button onClick={saveHighScore}>Save highscore</button>
          </form>
        </div>
      </div>
    )


  }
}


export default App
