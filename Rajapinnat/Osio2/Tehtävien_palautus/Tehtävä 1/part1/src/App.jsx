const App = () => {

  <div>
  </div>

  const JokeRandomizer = () => {
    fetch("https://programming-quotesapi.vercel.app/api/random")
          .then((response) => response.json())
          .then((quote) => console.log(quote)); 
  }

  return (
    <div>
      <button onClick={JokeRandomizer}>Random Joke</button>
    </div>
  )
}


export default App