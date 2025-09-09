const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


let games = [

    {
        "name": "Apex Legends",
        "percentage": "100%",
    },
    {
        "name": "Valorant",
        "percentage": "100%",
    },
    {
        "name": "FC 25",
        "percentage": "50%",
    },
    {
        "name": "Peak",
        "percentage": "33%",
    }

]

app.get('/api/games', (request, response) => {
    response.json(games)
})


app.post('/api/games', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "game missing"
        })
    }
    const game = {
        name: body.name,
        percentage: body.percentage,
    }
    games = games.concat(game)
    response.json(game)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})