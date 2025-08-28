import React, { useState } from "react";

function App() {
  const [search, setSearch] = useState("")
  const [pokemon, setPokemon] = useState(null)
  const [nextPokemon, setNextPokemon] = useState("")
  const [prevPokemon, setPrevPokemon] = useState("")

  const filterPokemon = () => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then((response) => { return response.json() })
      .then((data) => {
        setPokemon(data);
        setSearch(data.name)
        getNextPokemon(data.id)
        getPrevPokemon(data.id)
      })
  }
  const getPokemonWithId = async (id) => {
    let pokemonData
    await fetch(`https://pokeapi.co/api/v2/pokemon/` + id)
      .then( async (response) => {
         const data = await response.json() 
        pokemonData = data 
        console.log(pokemonData)
       
      })
       return pokemonData
       
  }

  const getNewPokemon = (id) => {
    const data = getPokemonWithId(id);
    setPokemon(data)
  }

  const getNextPokemon = (id) => {
    if (id === 10277) {
      const data = getPokemonWithId(1)
      setNextPokemon(data.name)
      return
    }

    const data = getPokemonWithId(id + 1)
    setNextPokemon(data.name)
  }

  const getPrevPokemon = (id) => {
    if (id === 1) {
      const data = getPokemonWithId(10277)
      setPrevPokemon(data.name)
      return
    }
    const data = getPokemonWithId(id - 1)
    setPrevPokemon(data.name)
  }

  const handleNextPokemon = () => {
    if (pokemon.id === 10277) {
      getNewPokemon(1)
    }
    else
      getNewPokemon(pokemon.id + 1);
  }

  const handlePrevPokemon = () => {
    if (pokemon.id === 1)
      getNewPokemon(10277)
    else
      getNewPokemon(pokemon.id - 1);

  }
  return (
    <div>
      <h1>pokemon Filterer</h1>
      <input
        value={search} onChange={(pokemon) => setSearch(pokemon.target.value)}
      />
      <button onClick={filterPokemon}>Search</button>

      {pokemon && (
        <div>
          <h2>{pokemon.name.toUpperCase()}</h2>
          <h3><p>Pokedex Index:</p> #{pokemon.id}</h3>
          <ul>
            {pokemon.types.map((t, index) => (
              <li key={index}>{t.type.name}</li>))}
          </ul>
          <h3><p>Weight</p>{pokemon.weight}</h3>
          <h3><p>height</p>{pokemon.height}</h3>
          <h3>Stats:</h3>
          <ul>{pokemon.stats.map((stat) => (
            <li key={stat.stat.name}> {stat.stat.name}:{stat.base_stat}</li>))}
          </ul>
          <img src={pokemon.sprites.front_default} alt={`${pokemon.name} normal`} />
          <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} />
          <button onClick={handlePrevPokemon}>{prevPokemon}</button>
          <button onClick={handleNextPokemon}>{nextPokemon}</button>
        </div>
      )}
    </div>

  );
}

export default App