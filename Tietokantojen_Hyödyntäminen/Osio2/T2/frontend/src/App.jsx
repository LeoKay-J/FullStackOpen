import React, { useState, useEffect } from "react"
import axios from 'axios'

function App() {

  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [loans, setLoans] = useState([])

  const [search, setSearch] = useState("")

  const [newBookName, setNewBookName] = useState("")
  const [newBookPublisher, setNewBookPublisher] = useState("")
  const [newBookPages, setNewBookPages] = useState("")
  const [newBookPreview, setNewBookPreview] = useState("")

  const [newUserFirstName, setNewUserFirstName] = useState("")
  const [newUserLastName, setNewUserLastName] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then((response) => {
        setBooks(response.data)
      })
  }, [])

  const handleBookSearch = (event) => {
    setSearch(event.target.value)
  }

  const bookFilter = books.filter((book) =>
    book.Name.toLowerCase().includes(search.toLowerCase())
  )

  const checkAvailableBooks = () => {
    axios.get('http://localhost:3000/books/availability')
      .then((response) => {
        setLoans(response.data)
      })
  }

  const addNewBook = (event) => {
    event.preventDefault()

    console.log('hello')

    const newBookInfo = {
      name: newBookName,
      publisher: newBookPublisher,
      pages: newBookPages,
      preview: newBookPreview
    }

    axios.post('http://localhost:3000/books/new', newBookInfo)
      .then((response) => {
        console.log(response)

        setNewBookName(""),
          setNewBookPublisher(""),
          setNewBookPages(""),
          setNewBookPreview(""),
          setBooks(books.concat(response.data))
      })
  }

  const addNewUser = (event) => {
    event.preventDefault()

    const newUserInfo = {
      Firstname: newUserFirstName,
      Lastname: newUserLastName
    }

    axios.post('http://localhost:3000/user/new', newUserInfo)
      .then((response) => {
        setNewUserFirstName("")
        setNewUserFirstName("")
        setUsers(users.concat(response.data))

      })
  }
  /*onChange for new books*/
  const handleNewBook = (event) => {
    setNewBookName(event.target.value)
  }
  const handleNewPublisher = (event) => {
    setNewBookPublisher(event.target.value)
  }
  const handleNewPages = (event) => {
    setNewBookPages(event.target.value)
  }
  const handleNewPreview = (event) => {
    setNewBookPreview(event.target.value)
  }

  /*onChange for new users*/
  const handleNewUserFirstName = (event) => {
    setNewUserFirstName(event.target.value)
  }
  const handleNewUserLastName = (event) => {
    setNewUserLastName(event.target.value)
  }

  /*onClick for loan availability */
  const handleLoanAvailability = (event) =>{
    setLoans(event.target.value)
  }
  return (
    <div>
      <div>
        <h1>Books</h1>
        <h2>Search</h2>
        <form>
          <input value={search} placeholder="Filter books" onChange={handleBookSearch}></input>
        </form>
        <h2>Search results</h2>
        <ul>
          {bookFilter.map((book) =>
            <li key={book.id}>
              {book.Name}, {book.Publisher}, {book.Pages} pages, {book.Preview}
            </li>
          )}
        </ul>
      </div>
      <div>
        <h2>Add new Book</h2>
        <form onSubmit={addNewBook}>
          <input onChange={handleNewBook} value={newBookName} placeholder="Book name"></input>
          <input onChange={handleNewPublisher} value={newBookPublisher} placeholder="Publisher"></input>
          <input onChange={handleNewPages} value={newBookPages} placeholder="Pages"></input>
          <input onChange={handleNewPreview} value={newBookPreview} placeholder="Preview"></input>
          <button>Add Book</button>
        </form>
      </div>

      <div>
        <h2>Add new User</h2>
        <form onSubmit={addNewUser}>
          <input onChange={handleNewUserFirstName} value={newUserFirstName} placeholder="Firstname"></input>
          <input onChange={handleNewUserLastName} value={newUserLastName} placeholder="Lastname"></input>
          <button>Add User</button>
        </form>
      </div>
      <div>
        <h2>Loanable books</h2>
        <button onClick={handleLoanAvailability}value={loans}>Press to see available books</button>
        <ul>
          {checkAvailableBooks.map((loan) => 
          <li key={loan.id}>{}</li>)}
        </ul>
      </div>
    </div>
  )
}
export default App