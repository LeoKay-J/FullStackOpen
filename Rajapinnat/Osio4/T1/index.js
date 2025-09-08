const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


let quotes = [
  {
    "author": "Fred Brooks",
    "quote": "Very good professional programmers are ten times as productive as poor ones, at same training and two-year experience level."
  },
  {
    "author": "Ward Cunningham",
    "quote": "It was a turning point in my programming career when I realized that I didn't have to win every argument."
  },
  {
    "author": "Bob Frankston",
    "quote": "Ideas don't disappear. They change form, they merge with other ideas."
  },
  {
    "author": "Toru Iwatani",
    "quote": "I'm interested in creating images that communicate with people."
  },
  {
    "author": "Daniel T. Barry",
    "quote": "A team of highly competent programmers who are also highly territorial, egotistical politicians will fail while a team of equally competent programmers, who are also egoless, cooperative, team players will succeed."
  },
  {
    "author": "Bill Gates",
    "quote": "We're no longer in the days where everything is super well crafted. But at the heart of the programs that make it to the top, you'll find that the key internal code was done by a few people who really know what they were doing."
  },
  {
    "author": "Donald Knuth",
    "quote": "The more varieties of different kinds of notations are still useful — don’t only read the people who code like you."
  },
  {
    "author": "Marijn Haverbeke",
    "quote": "A program is a building of thought. It is costless to build, it is weightless, and it grows easily under our typing hands. But without care, a program’s size and complexity will grow out of control, confusing even the person who created it."
  },
  {
    "author": "Martin Fowler",
    "quote": "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
  },
  {
    "author": "Carl Friedrich Gauss",
    "quote": "I am never satisfied until I have said as much as possible in a few words, and writing briefly takes far more time than writing at length."
  }
]

app.get('/api/quotes', (request, response) => {
  response.json(quotes)
})

app.get('/api/quotes/random', (request, response) => {
  const randomQuote = Math.floor(Math.random() * quotes.length);
  response.json(quotes[randomQuote])
})

app.post('/api/quotes', (request, response) => {
  const body = request.body
 
  if (!body.quote) {
    return response.status(400).json({
      error: 'quote missing'
    })
    
  }
  const quote = {
    quote: body.quote,
    author: body.author
  }
  quotes = quotes.concat(quote)

  response.json(quote)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})