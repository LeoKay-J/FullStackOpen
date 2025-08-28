import { useState, useEffect } from "react";

const App = () => {
  const [dogImage, setDogImage] = useState("")
  const [breeds, setBreeds] = useState([])
  const [selectedBreed, setSelectedBreed] = useState("")


  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        setBreeds(Object.keys(data.message));
      })
  }, [])

  const RandomDogImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setDogImage(data.message));
  }

  const handleBreedChange = (e) => {
    const breed = e.target.value;
    setSelectedBreed(breed);

    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then((data) => setDogImage(data.message));
    }
  }

  return (
    <div>
      <h1>Choose a Dog Breed</h1>

      <button onClick={RandomDogImage}>Show Random Dog</button>

      <select value={selectedBreed} onChange={handleBreedChange}>
        <option value="">-- Select a breed --</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {dogImage && (
        <div>
          <img src={dogImage} alt={selectedBreed} style={{ maxWidth: "400px" }} />
        </div>
      )}
    </div>
  )
}

export default App;
