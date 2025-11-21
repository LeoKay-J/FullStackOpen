import React, { useState, useEffect } from "react"
import axios from 'axios'
import './app.css'


function App() {
  /*categories*/
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategories] = useState("")
  /*records */
  const [newUsername, setNewUsername] = useState("")
  /*highscore*/
  const [highscore, setHighScore] = useState([])
  /*questions*/
  const [questions, setQuestions] = useState([])
  const [questionChoicesToShow, setQuestionChoicesToShow] = useState(null)
  const [questionChoices, setQuestionChoices] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState(0)
  /*quiz game*/
  const [gameState, setGameState] = useState("start")
  const [score, setScore] = useState(0)
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
    axios.get("http://localhost:3000/highscore")
      .then((response) => {
        setHighScore(response.data)
        console.log(response.data)
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
        console.log(response)
        setGameState("start")

        axios.get("http://localhost:3000/highscore")
          .then((response) => {
            console.log("HERE", response.data)
            setHighScore(response.data)
          })
      })


  }
  const checkCorrectAnswer = (event) => {
    var correctChoice = questionChoicesToShow.filter(correctAnswer => correctAnswer.right_choice)

    let newScore = score
    if (Number(event.target.value) === correctChoice[0].id) {
      newScore += 1
      setScore(newScore)
    }

    let nextIndex = currentQuestionIndex + 1

    if (nextIndex >= questions.length) {
      setTimerRunning(false)
      if (newHighScore(newScore)) {
        setGameState("highscore-end")
      }
      else {
        setGameState("end")
      }
    }

    setCurrentQuestionsIndex(nextIndex)
    setQuestionChoicesToShow(questionChoices.filter(choice => choice.question_id === questions[nextIndex].id))
  }

  const newHighScore = (newScore) => {
    let minScore = highscore[9].score

    if (newScore < minScore) {
      return false
    }
    else if (newScore === minScore) {
      if (time >= highscore[9].answer_time) {
        return false
      }
      else {
        return true
      }
    }
    else {
      return true
    }
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
            {highscore.map(data =>
              <li key={data.id}>name: <b>{data.username}</b> / score: <b>{data.score}</b> / time: <b>{data.answer_time} sec</b>
              </li>)}
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
          <h1>Save Score</h1>
          <h3>Your score: {score}p</h3>
          <h3>Your time: {time} sec</h3>
          <form onSubmit={saveHighScore}>
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="username" required
            />

            <button>Save highscore</button>

          </form>
          <button onClick={backToMeny}>back to menu</button>
        </div>
      </div>
    )


  }
}


export default App
