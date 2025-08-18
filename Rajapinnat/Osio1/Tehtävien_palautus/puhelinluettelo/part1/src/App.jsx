import { useState } from 'react'

const App = () => {
  const [people, setPeople] = useState([ 
    { name: 'Arto Hellas' }]) 
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
      content: newName,
    }

    setPeople(people.concat(peopleObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)

  }
  const List = ({people}) => {
    return(
      <li>{people.name}</li>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
        
        
        <form> 
          <div onSubmit={addName}>name:
            <input value={newName} onChange={handleNameChange}/></div>
          <div onSubmit={addNumber}>number:
            <input value={newNumber} onChange={handleNumberChange}/></div>
          <div><button type="submit">add</button></div>
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