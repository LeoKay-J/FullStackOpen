import { useState, useEffect } from 'react'
import personServices from './services/notes.js'

const FilterNames = ({ filter, search }) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter Names: <input value={filter} onChange={search} />
      </div>
    </div>
  )
}

const NewNameAndNumber = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const List = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const NamesAndNumbers = ({ peopleToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map(person =>
          <List key={person.id} person={person} />
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personServices.getAll()
      .then(response => {
        setPeople(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const found = people.find(person => person.name === newName)

    if (found) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const peopleObject = {
      name: newName,
      number: newNumber,
    }

    personServices.create(peopleObject)
      .then(response => {
        setPeople(people.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const Search = (event) => {
    setFilter(event.target.value)
  }

  const peopleToShow = filter === ''
    ? people
    : people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <FilterNames filter={filter} search={Search} />
      <NewNameAndNumber addName={addName}mnewName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <NamesAndNumbers peopleToShow={peopleToShow} />
    </div>
  )
}

export default App
