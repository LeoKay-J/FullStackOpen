require('dotenv').config();
const express = require('express');
const { supabase } = require('./database.js');

const app = express();
app.use(express.json());

app.get('/users', async (request, response) => {
    const { data, error } = await supabase.from("users").select("*")

    if (error) {
        console.error('Error fetching users:', error);
        return response.status(500).json({ error: 'Database error' })
    }
    response.json(data)
})

app.get('/users/:id', async (request, response) => {
    const { id } = request.params

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching users:', error);
        return response.status(500).json({ error: 'Database error' })
    }
    response.json(data)
})
app.post('/users', async (request, response) => {
    const body = request.body

    const { data, error } = await supabase
        .from("users")
        .insert([{
            Email: body.Email,
            Username: body.Username,
            Password: body.Password
        }])
        .select()
        .single()

    if (error) {
        console.error('Error fetching users:', error);
        return response.status(500).json({ error: 'Database error' })
    }
    response.json(data)
})

app.put('/users/:id', async (request, response) => {
    const body = request.body
    const {id} = request.params

    const { data, error } = await supabase
        .from("users")
        .update({
            Email: body.Email,
            Username: body.Username,
            Password: body.Password
        })
        .select()
        .eq('id', id)

    if (error) {
        console.error('Error fetching users:', error);
        return response.status(500).json({ error: 'Database error' })
    }
    response.json(data)
})

app.delete('/users/:id', async (request, response) => {
    const {id} = request.params

    const {data, error} = await supabase
    .from("users")
    .delete()
    .eq("id",id)
   
    if (error) {
        console.error('Error fetching users:', error);
        return response.status(500).json({ error: 'Database error' })
    }
    response.json(data)
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})