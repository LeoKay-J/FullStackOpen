import { useState } from "react"


const PlayedGames = ({ playedGames }) => {
  return (
    <div>
      {playedGames.map(games =>
        <div key={games.id}>
          <p>{games.name}</p>
          <p>{games.percentage}</p>
        </div>)}
    </div>
  )
}


function App() {
  const [games, setGames] = useState([
        {
          name: "Apex Legends",
          percentage: "100%",
          id: 1,
        },
        {
          name: "Valorant",
          percentage: "100%",
          id: 2,
        },
        {
          name: "FC 25",
          percentage: "50%",
          id: 3,
        },
        {
          name: "Peak",
          percentage: "33%",
          id: 4,
        }
  ])
  const [newGames, setNewGames] = useState("")
  const [newGamePercent, setNewGamePercent] = useState("")

  const addGame = (event) => {
    event.preventDefault()
   
    const gameInfo = {
      name: newGames,
      percentage: newGamePercent,
      id: generateId()
    } 
    console.log(gameInfo)
    setGames(games.concat(gameInfo))
    setNewGames(''),
    setNewGamePercent('')

  }

  const generateId = () => {
    const maxId = games.length > 0
        ? Math.max(...games.map(p => Number(p.id)))
        : 0
    return String(maxId + 1)
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
        <PlayedGames playedGames={games} />
      </div>
      <div>
        <form onSubmit={addGame}>
          <input value={newGames} placeholder="-Game name-" onChange={handleGameChange}></input>
          <input value={newGamePercent} placeholder="-Completed %-" onChange={handlePercentChange}></input>
          <input value="submit" type="submit"/>
        </form>
      </div>
    </div>
  )
}

export default App