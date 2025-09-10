import { useState, useEffect } from "react"
import axios from 'axios'



const PlayedGames = ({ getGames, deleteGame }) => {
  return (
    <div>
      {getGames.map(games =>
        <div key={games.name}>
          <p>Game: {games.name}</p>
          <p>Percentage: {games.percentage}</p><button onClick={() => deleteGame(games.name)}>Delete Game</button>
        </div>)}
    </div>
  )
}

function App() {
  const [games, setGames] = useState([])
  const [newGames, setNewGames] = useState("")
  const [newGamePercent, setNewGamePercent] = useState("")

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/games/')
      .then((response) => {
        setGames(response.data)
      })
  }, []);

  const addGame = (event) => {
    event.preventDefault()

    const gameInfo = {
      name: newGames,
      percentage: newGamePercent,
    }
    console.log(gameInfo)

    fetch('http://localhost:3001/api/games/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameInfo)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setNewGames("")
        setNewGamePercent("")
        setGames(games.concat(gameInfo))
      })
  }

  const deleteGame = (name) => {

    fetch('http://localhost:3001/api/games/' + name, {
      method: "DELETE"
    })
      .then((response) => {
        setGames(games.filter(game => game.name !== name))
      })
  }

  const updateGame = () => {
    fetch('http://localhost:3001/api/games/', {
      method: "PUT",
      headers: { "Content-Type": "aplication/json" },
      body: JSON.stringify()
    })
  }
  const handleGameChange = (event) => {
    setNewGames(event.target.value)
  }

  const handlePercentChange = (event) => {
    setNewGamePercent(event.target.value)
  }
  return (
    <div>
      <div>
        <h1>Played Games</h1>
        <PlayedGames getGames={games} deleteGame={(name) => deleteGame(name)} />
      </div>
      <div>
        <form onSubmit={addGame}>
          <input value={newGames} placeholder="-Game name-" onChange={handleGameChange}></input>
          <input value={newGamePercent} placeholder="-number-  -%-" onChange={handlePercentChange}></input>
          <input value="submit" type="submit" />
        </form>
      </div>
    </div>
  )
}

export default App