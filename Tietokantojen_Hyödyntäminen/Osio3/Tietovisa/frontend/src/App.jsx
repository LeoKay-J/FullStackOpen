import React, { useState, useEffect } from "react"
import axios from 'axios'
import './app.css'


function App() {
  /*categories*/
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategories] = useState("")
  /*records */
  const [records, setRecords] = useState([])
  const [newUsername, setNewUsername] = useState("")
  /*questions*/
  const [questions, setQuestions] = useState([])
  const [questionChoicesToShow, setQuestionChoicesToShow] = useState(null)
  const [questionChoices, setQuestionChoices] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState(0)
  const [answerTime, setAnswerTime] = useState([])
  /*quiz game*/
  const [gameState, setGameState] = useState("start")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState([])
  /*timer*/
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);



  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then((response) => {
        setCategories(response.data)
      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:3000/records")
      .then((response) => {
        setRecords(response.data)
      })
  }, [])

  useEffect(() => {
    let interval = null;

    if (timerRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    if (!timerRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  const quizStart = () => {
    axios.get('http://localhost:3000/questions/' + selectedCategory)
      .then((response) => {
        setQuestions(response.data)
        setGameState("quiz")
        setCurrentQuestionsIndex(0)
        console.log(response.data)

        setTime(0)
        setTimerRunning(true)

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
      score: score,
      answer_time: time
    }
    axios.post('http://localhost:3000/records', newUserInfo)
      .then((response) => {
        setNewUsername("")
        setScore("")
        setAnswerTime("")
        setRecords(records.concat(response.data))
        setGameState("start")
      })
  }

  const checkCorrectAnswer = (event) => {
    var correctChoice = questionChoicesToShow.filter(correctAnswer => correctAnswer.right_choice)

    if (Number(event.target.value) === correctChoice[0].id) {
      setScore(score + 1)
    }

    let nextIndex = currentQuestionIndex + 1

    if (nextIndex >= questions.length) {
      setTimerRunning(false)
      setAnswerTime(time)
      setHighScore(score)
      setGameState("highscore-end")

      return
    }

    setCurrentQuestionsIndex(nextIndex)
    setQuestionChoicesToShow(questionChoices.filter(choice => choice.question_id === questions[nextIndex].id))
  }


  const backToMeny = () => {
    setGameState("start")
    setQuestions([])
    setCurrentQuestionsIndex(0)
    setScore(0)

  }
  if (gameState === "start") {
    return (
      <div className="start_body">
        <div className="HeaderStyle">
          <h1>Quiz</h1>
        </div>
        <div className="CategorySelect">
          <h2>Select category for quiz</h2>
          <select onChange={(e) => setSelectedCategories(e.target.value)}>
            <option>-select category-</option>
            {categories.map(categories => <option key={categories.categories}>{categories.categories}</option>)}
          </select>
          <button onClick={quizStart} disabled={!selectedCategory}>start quiz</button>
        </div>
        <div className="HighScoreLeaderboard">
          <h2>Highscore</h2>
          <ul>
            {records.map(record => (
              <li key={record.id}>
                {record.username} / {record.score} / {record.answer_time} sec
              </li>
            ))}
          </ul>

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
        <div className="QuizTimer">time: {time}</div>
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
      <div className="end_block">
        <h1>Return to start</h1>
        <div className="end_quizscore">
          <h3>Your score: {score}</h3>
          <h3>Your time: {time} sec</h3>
          <button onClick={backToMeny}>back to menu</button>
        </div>
      </div>
    )

  }
  if (gameState === "highscore-end") {

    return (
      <div>
        <div>
          <h1>Save highscore</h1>
           <h3>Your score: {score}</h3>
          <h3>Your time: {time} sec</h3>
          <form onSubmit={saveHighScore}>
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="username"
            />

            <button>Save highscore</button>
          </form>
        </div>
      </div>
    )


  }
}


export default App
