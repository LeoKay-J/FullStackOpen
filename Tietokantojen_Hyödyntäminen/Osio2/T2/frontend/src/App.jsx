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

  const [newLoanStartDate, setNewLoanStartDate] = useState("")
  const [newLoanEndDate, setNewLoanEndDate] = useState("")
  const [newLoanBookId, setNewLoanBookId] = useState("")
  const [newLoanUserId, setNewLoanUserId] = useState("")

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then((response) => {
        setBooks(response.data)
      })
  }, [])

  const handleBookSearch = (event) => {
    setSearch(event.target.value)
  }

  const bookFilter =
    books.filter((book) =>
      book.name.toLowerCase().includes(search.toLowerCase())
    )

  const checkAvailableBooks = () => {
    axios.get('http://localhost:3000/availability')
      .then((response) => {
        setLoans(response.data)

      })
  }

  const addNewBook = (event) => {
    event.preventDefault()

    const newBookInfo = {
      name: newBookName,
      publisher: newBookPublisher,
      pages: newBookPages,
      preview: newBookPreview
    }

    axios.post('http://localhost:3000/books/enw', newBookInfo)
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
      firstname: newUserFirstName,
      lastname: newUserLastName
    }

    axios.post('http://localhost:3000/user/new', newUserInfo)
      .then((response) => {
        setNewUserFirstName("")
        setNewUserFirstName("")
        setUsers(users.concat(response.data))

      })
  }

  const makeNewLoan = (event) => {
    event.preventDefault()
    const newLoanInfo = {
      startdate: newLoanStartDate,
      enddate: newLoanEndDate,
      book_id: newLoanBookId,
      user_id: newLoanUserId
    }


    axios.post('http://localhost:3000/newloan', newLoanInfo)
      .then((response) => {
        setNewLoanStartDate("")
        setNewLoanEndDate("")
        setNewLoanBookId("")
        setNewLoanUserId("")
        setLoans(loans.concat(response.data))
      })
  }

  return (
    <div>
      <h1>Books</h1>
      <div>
        <h2>Add new Book</h2>
        <form onSubmit={addNewBook}>
          <input onChange={(event) => setNewBookName(event.target.value)} value={newBookName} placeholder="Book name"></input>
          <input onChange={(event) => setNewBookPublisher(event.target.value)} value={newBookPublisher} placeholder="Publisher"></input>
          <input onChange={(event) => setNewBookPages(event.target.value)} value={newBookPages} placeholder="Pages"></input>
          <input onChange={(event) => setNewBookPreview(event.target.value)} value={newBookPreview} placeholder="Preview"></input>
          <button>Add Book</button>
        </form>
      </div>
      <div>
        <h2>Add new User</h2>
        <form onSubmit={addNewUser}>
          <input onChange={(event) => setNewUserFirstName(event.target.value)} value={newUserFirstName} placeholder="Firstname"></input>
          <input onChange={(event) => setNewUserLastName(event.target.value)} value={newUserLastName} placeholder="Lastname"></input>
          <button>Add User</button>
        </form>
      </div>
      <div>
        <h2>Loan a book</h2>
        <form onSubmit={makeNewLoan}>
          <input type="date" onChange={(event) => setNewLoanStartDate(event.target.value)} value={newLoanStartDate} placeholder="Loan Start Date"></input>
          <input type="date" onChange={(event) => setNewLoanEndDate(event.target.value)} value={newLoanEndDate} placeholder="Loan End Date"></input>
          <input onChange={(event) => setNewLoanBookId(event.target.value)} value={newLoanBookId} placeholder="Book ID"></input>
          <input onChange={(event) => setNewLoanUserId(event.target.value)} value={newLoanUserId} placeholder="User ID"></input>
          <button>Loan book</button>
        </form>
      </div>
      <div>
        <h2>Loanable books</h2>
        <button onClick={checkAvailableBooks} value={loans}>Press to see available books</button>
        <ul>
          {loans.map(book => <li key={book.id}>{book.name}</li>)}
        </ul>
      </div>
      <div>
        <h2>Search</h2>
        <form>
          <input value={search} placeholder="Filter books" onChange={handleBookSearch}></input>
        </form>
        <h2>Search results</h2>
        <ul>
          {bookFilter.map((book) =>
            <li key={book.id}>
              {book.name}, {book.publisher}, {book.pages} pages, {book.preview}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
export default App