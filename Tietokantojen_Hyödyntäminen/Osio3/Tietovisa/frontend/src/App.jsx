import React, { useState, useEffect } from "react"
import axios from 'axios'
import './app.css'




function App() {

const [categories, setCategories] = useState([])


useEffect(()=> {
  axios.get('http://localhost:3000/categories')
  .then((response) => {
    setCategories(response.data)
  })
})
  return (
   <div>
    <div className="HeaderStyle">
      <h1>TietoVisa</h1>
    </div>
    <div>
      <select name="Select">
        <option>--select category--</option>
        <option>{categories.map(</option>
      </select>
    </div>
   </div>
  )
}

export default App
