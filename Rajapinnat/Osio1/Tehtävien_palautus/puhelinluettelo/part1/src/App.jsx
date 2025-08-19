import { useState } from 'react'

const App = () => {
  const [people, setPeople] = useState([ 
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
  
  const addName = (event) => {
    event.preventDefault()

      const found = people.find(person => person.name === newName)
      if(found){
        alert(`${newName} is already added to phonebook`)
        return
      }
      const peopleObject ={
        name: newName,
        number: newNumber
      }

    setPeople(people.concat(peopleObject))
    setNewName('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)

  }
  const List = ({people}) => {
    return(
      <li>{people.name} {people.number}</li>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
        
        <
        
        <form onSubmit={addName}> 
          <div >
            name: <input value={newName} onChange={handleNameChange}/></div>
            number:<input value={newNumber} onChange={handleNumberChange}/>
          <div><button type="submit">add</button></div>
        </form>

        
        
        <h2>Numbers</h2>
      
        <ul>
          {people.map(people => 
          <List key={people.name} people={people}/>)}
        </ul>
        
        
    </div>
  )
}
export default App