require('dotenv').config()
const express = require('express')
const { supabase } = require('./database.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/categories', async (request,response) => {
const { data, error } = await supabase
.rpc('get_distinct_categories')
response.json(data)
}) 

app.get('/questions/:id', async (request, response) => {
    const id = request.params.id
    console.log(id)
    const{data,error} = await supabase
    .rpc("get_random_question", {category: id})
    response.json(data)
})

app.get('/choices', async (request,response) =>{
    const{data,error} = await supabase
    .from('question_choices')
    .select('*')
    response.json(data)
})

app.post('/records', async (request,response)=> {
    const body = request.body

    const {data,error} = await supabase
    .from('records')
    .insert({
        username: body.username,
        score: body.score
    })
    .select()
    .single()

    response.json(data)
}) 


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})