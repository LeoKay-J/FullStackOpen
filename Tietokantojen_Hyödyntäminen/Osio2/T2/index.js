require('dotenv').config()
const express = require('express')
const { supabase } = require('./database.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/books', async (request, response) => {
    const { data } = await supabase
        .from('books')
        .select('*')

    response.json(data)
})

app.get('/books/:id', async (request, response) => {
    const { id } = request.params

    const { data } = await supabase
        .from('books')
        .select()
        .eq('id', id)

    response.json(data)
})

app.get('/books/availability', async (request, response) => {

    const { data: loanedBooks, error: loanError } = await supabase
        .from('loan')
        .select('book_id')
        .not('book_id', 'is', null);

    if (loanError) {
        console.error('Error fetching loaned books:', loanError);
        return;
    }

    const loanedBookIds = loanedBooks.map(item => item.book_id);

    const { data: availableBooks, error: booksError } = await supabase
        .from('books')
        .select('*')
        .not('id', 'in', `(${loanedBookIds.join(',')})`);

    if (booksError) {
        console.error('Error fetching available books:', booksError);
    } else {
        console.log('Available books:', availableBooks);
    }

    response.json(availableBooks)
})

app.get('/loans', async (request, response) => {
    const { data } = await supabase
        .from("loan")
        .select("*")
        .order("id")

    response.json(data)
})

app.post('/books/new', async (request, response) => {
    const body = request.body

    console.log(body)

    const { data, error } = await supabase
        .from("books")
        .insert({
            Name: body.name,
            Publisher: body.publisher,
            Pages: body.pages,
            Preview: body.preview
        })
        .select()
        .single()

        if(error){
            console.log(error)
        }

        console.log(data)
    response.json(data)
})

app.post('/user/new', async (request, response) => {
    const body = request.body
    
    const{data} = await supabase
    .from("user")
    .insert({
        Firstname: body.Firstname,
        Lastname: body.Lastname
    })

    response.json(data)
})

app.post('/newloan', async (request, response)=> {
    const body = request.body

    const {data, error} = await supabase
    .from("loan")
    .insert({
        Startdate: body.Startdate,
        Enddate: body.Enddate,
        book_id: body.book_id,
        user_id: body.user_id
    })

    if (error) {
        console.error('Error fetching users:', error);
        return response.status(500).json({ error: 'Database error' })
    }
    response.json(data)
})

app.delete('/loan/end/:id', async (request, response)=> {
    const {id} = request.params

    const {data, error} = await supabase
    .from('loan')
    .delete()
    .eq("id", id)

    if(error){
        console.error('Error removing loan from database', error)
        return response.status(500).json({error: 'Database error'})
    }

    response.json(data)
})
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})