import { useState } from "react"

const App = () => {
  const [DawgInfo, setDawgInfo] = useState([])

  const DawgPictures = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setDawgInfo(data.data))
      .then((DawgInfo) => console.log(DawgInfo));
  }

  const DropDownDawg = () => {
    return (
      <div>
        <label>Choose a DAWG</label>
        <select id="Dawg select">Choose Dawg</select>

      </div>
    )
  }

  return (
    <div>
      <h1>DAWG</h1>
      <button onClick={DawgPictures}>Random Dawg picture</button>
      <ul>
        {DawgInfo.map((dogimages, index) => (
          <li key={index}>{dogimages}</li>
        ))}
      </ul>
      <DropDownDawg DropDownDawg={DropDownDawg} />

    </div>


  )
}

export default App
