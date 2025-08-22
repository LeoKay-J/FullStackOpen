import { useState, useEffect } from 'react'
import personServices from './services/notes.js'
import './index.css'

const FilterNames = ({ filter, search }) => {
  return (
    <div>
      
      <h1>Phonebook</h1>
      <div>
        Filter Names: <input value={filter} onChange={search} />
      </div>
    </div>
  )
}
const NewNameAndNumber = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <div>
      <h1>Add New</h1>
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
const NamesAndNumbers = ({ peopleToShow, confirmDelete }) => {
  return (
    <div>
      <h1>Numbers</h1>
      <ul>
        {peopleToShow.map(person =>
          <List key={person.id} person={person} confirmDelete={() => confirmDelete(person)} />
        )}
      </ul>
    </div>
  )
}

const List = ({ person, confirmDelete }) => {
  return (
    <li>{person.name} {person.number} <button onClick={confirmDelete}>delete</button></li>
  )
}
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="popup">
        {message}
      </div>
    )
  }
const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [popUpMessage, setPopUpMessage] = useState(null)

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
         setPopUpMessage(
          `Created `+ response.data.name
        )
        setTimeout(() => {
          setPopUpMessage(null)
        }, 5000)
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

  const confirmDelete = (person) => {
    if (window.confirm("Do you want to delete " + person.name)) {
      personServices.personsDelete(person.id)
        .then(response => {
          setPeople(people.filter(person => response.data.id !== person.id
          ))
          
          setPopUpMessage(
            `Note '${people.content}' was already removed from server`
          )
          setTimeout(() => {
            setPopUpMessage(null)
          }, 5000)
        })
    }
  }

  const peopleToShow = filter === ''
    ? people
    : people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))




  return (
    <div>
      <Notification message={popUpMessage} />
      <FilterNames filter={filter} search={Search} Notification={Notification} />
      <NewNameAndNumber addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}  />
      <NamesAndNumbers peopleToShow={peopleToShow} confirmDelete={confirmDelete} />
    </div>
  )
}

export default App