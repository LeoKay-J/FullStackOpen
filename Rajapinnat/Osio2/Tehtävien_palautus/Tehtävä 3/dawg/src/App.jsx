import { useState, useEffect } from "react";

const App = () => {
  const [dogImage, setDogImage] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  // Fetch breed list when component mounts
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.json())
      .then((data) => {
        setBreeds(Object.keys(data.message));
      });
  }, []);

  // Fetch a dog image for the chosen breed
  const handleBreedChange = (e) => {
    const breed = e.target.value;
    setSelectedBreed(breed);

    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((res) => res.json())
        .then((data) => setDogImage(data.message));
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🐕 Choose a Dog Breed</h1>

      <select value={selectedBreed} onChange={handleBreedChange}>
        <option value="">-- Select a breed --</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {dogImage && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={dogImage}
            alt={selectedBreed}
            style={{ maxWidth: "400px", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default App;
