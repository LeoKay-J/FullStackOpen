require('dotenv').config()
const express = require('express')
const { supabase } = require('./database.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/tietovisa', async (request,response) => {
    const {data} = await supabase
    .from
}) 