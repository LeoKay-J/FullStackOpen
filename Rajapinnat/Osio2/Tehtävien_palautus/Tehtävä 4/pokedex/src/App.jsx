import React, { useState } from "react";
import './app.css';

function App() {
  const [search, setSearch] = useState("")
  const [pokemon, setPokemon] = useState(null)
  const [nextPokemon, setNextPokemon] = useState("")
  const [prevPokemon, setPrevPokemon] = useState("")
  const [abilitiesInfo, setAbilitiesInfo] = useState([])

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
      .then(async (response) => {
        const data = await response.json()
        pokemonData = data

      })
    return pokemonData

  }

  const getNewPokemon = async (id) => {
    const data = await getPokemonWithId(id);
    setPokemon(data)
    getNextPokemon(data.id)
    getPrevPokemon(data.id)
  }

  const getNextPokemon = async (id) => {
    if (id === 10277) {
      const data = await getPokemonWithId(1)
      setNextPokemon(data.name)
      return
    }

    const data = await getPokemonWithId(id + 1)
    setNextPokemon(data.name)
  }

  const getPrevPokemon = async (id) => {
    if (id === 1) {
      const data = await getPokemonWithId(10277)
      setPrevPokemon(data.name)
      return
    }
    const data = await getPokemonWithId(id - 1)
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
  const getTypeColor = (typeName) => {
    if (typeName === 'fire') {
      return 'red'
    }
    else if (typeName === 'water') {
      return 'darkblue'
    }
    else if (typeName === 'grass') {
      return 'green'
    }
    else if (typeName === 'normal') {
      return 'gray'
    }
    else if (typeName === 'flying') {
      return 'lightgray'
    }
    else if (typeName === 'Dragon') {
      return 'blue'
    }
    else if (typeName === 'poison') {
      return 'purple'
    }
    else if (typeName === 'bug') {
      return 'darkgreen'
    }
    else if (typeName === 'dark') {
      return 'black'
    }
    else if (typeName === 'ghost') {
      return 'lightpurple'
    }
    else if (typeName === 'psychic') {
      return 'darkpink '
    }
    else if (typeName === 'electric') {
      return 'yellow'
    }
    else if (typeName === 'rock') {
      return 'brown'
    }
    else if (typeName === 'fairy') {
      return 'pink'
    }
    else if (typeName === 'ground') {
      return 'lightbrown'
    }
    else if (typeName === 'steel') {
      return 'silver'
    }
    else if (typeName === 'fighting') {
      return 'orange'
    }
    else if (typeName === 'ice') {
      return 'blue'
    }
  }


  const pokemonCries = () => {
    if (pokemon) {
      const audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokemon.name.toLowerCase()}.mp3`);
      audio.play();
    }
  }

  const getPokemonAbilityInfo = (abilityName) => {
    fetch(`https://pokeapi.co/api/v2/ability/${abilityName}/`)
      .then((response) => response.json())
      .then((data) => { setAbilitiesInfo(data); })
  }
  return (
    <div>
      <h1>pokedex</h1>
      <input
        value={search} onChange={(pokemon) => setSearch(pokemon.target.value)} />
      <button onClick={filterPokemon}>Search</button>

      {pokemon && (
        <div>
          <div>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <h3><p>Pokedex Index: </p>#{pokemon.id}</h3>
          </div>

          <div>
            <h3>Pokemon types</h3>
            <ul className="pokeType">
              {pokemon.types.map((t, index) => (
                <li
                  key={index}
                  style={{ color: getTypeColor(t.type.name) }}>
                  {t.type.name}
                </li>
              ))}
            </ul>
          </div>

          <h3>Weight<p>{pokemon.weight}</p></h3>
          <h3>height<p>{pokemon.height}</p></h3>

          <div>
            <h3>Stats:</h3>
            <ul className="pokeStats">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}> {stat.stat.name}:{stat.base_stat}</li>))}
            </ul>
          </div>

          <div>
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name} normal`} />
            <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} />
          </div>

          <div>
            <button onClick={pokemonCries}>Press for pokemon sounds</button>
          </div>

          <div>
            <p>pokemon abilities: </p>
              {pokemon.abilities.map(abilities =>
                <button onClick={() => getPokemonAbilityInfo(abilities.ability.name)} key={abilities.ability.name}>{abilities.ability.name}</button>
                )}
          </div>

          <div>
            <button onClick={handlePrevPokemon}>{prevPokemon}</button>
            <button onClick={handleNextPokemon}>{nextPokemon}</button>
          </div>

          <div>
            <p>Ability name: {abilitiesInfo.names[7].name}</p>
            <p>Effect: {abilitiesInfo.effect_entries[1].effect}</p>
            <p></p>
          </div>
        </div>
      )}
    </div>

  );
}

export default App