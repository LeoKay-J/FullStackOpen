import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas' } ]) 
  const [newName, setNewName] = (event) =>{
    event.preventDefault()
  }


  return (
    <div>
      <h2>Phonebook</h2>
        <ul>
          {persons.map(persons => 
          <persons key={persons.id} persons={persons}/>)}
        </ul>
        <form onSubmit={newName}>
            <div>
              name: <input />
              <button type="submit">add</button>
            
            </div>
            
        </form>

      <h2>Numbers</h2>
      
    </div>
  )

}

export default App