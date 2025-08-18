import { useState } from 'react'

const App = () => {
  const [people, setPeople] = useState([ 
    { name: 'Arto Hellas' } ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const peopleObject ={
      name: newName,
      content: newName
    }
    setPeople(people.concat(peopleObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const List = ({people}) => {
    return(
      <li>{people.name}</li>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
        
        
        <form onSubmit={addName}>
          name: <input value={newName}
          onChange={handleNameChange}
          />
          <button type="submit">add</button>
        </form>

        
        
        <h2>Numbers</h2>
      
      <ul>
          {people.map(people => 
          <List key={people.id} people={people}/>)}
        </ul>
    </div>
  )
}
export default App