import { useState } from "react";

const App = () => {
  const [search, setSearch] = useState([])
  const [pokemon, setPokemon] = useState([])
  
  
  const pokemonInfo = () => {
     if (pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
        .then((response) => response.json())
        .then((data) => setDogImage(data.message));
    }
  

  return (
    <div>
   <h1>PokeDex</h1>
   Search Pokemon: <input onChange={}/>
   </div>
  )
}
}

export default App
