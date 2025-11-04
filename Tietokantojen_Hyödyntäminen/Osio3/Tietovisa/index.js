require('dotenv').config()
const express = require('express')
const { supabase } = require('./database.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/categories', async (request,response) => {
const { data, error } = await supabase.rpc('get_distinct_categories');

response.json(data)
}) 


app.get('/questions,')


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})