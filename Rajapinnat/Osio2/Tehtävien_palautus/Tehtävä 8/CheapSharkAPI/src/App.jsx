import { useEffect, useState } from 'react'

function App() {
  const { gamesOnSale, setGamesOnSale } = useState([])
  const { searchedGames, setSearchedGames} = useState("")



  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch("https://www.cheapshark.com/api/1.0/games?title=${SearchedGames} ", requestOptions)
      .then(response => gamesOnSale(response.data))
      .then(result => console.log(result))
  })
  const handleGameSearch = (event) => {
    setGamesOnSale(event.target.value)
  }
  const handleGameSearchSubmit = (event) => {
    setSearchedGames(event.target.value)
  }
  return (
    <div>
      <h2>Search Steam games on sale</h2>
      <input onChange={handleGameSearch}></input>
      <button onSubmit={handleGameSearchSubmit}>Search</button>
      <p>{gamesOnSale}</p>
    </div>
  )
}

export default App
