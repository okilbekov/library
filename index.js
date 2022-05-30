const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json())

let books = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/books', (request, response) => {
  response.json(books)
})

app.get('/api/books/:id', (request, response) => {
  const id = Number(request.params.id)
  const book = books.find(book => book.id === id)
  if(book) {
    response.json(book)
  } else {
    reponse.status(404).end()
  }
})

app.delete('/api/books/:id', (request, response) => {
  const id = Number(request.params.id)
  books = books.filter(book => book.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = books.length > 0
    ? Math.max(...books.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/books', (request, response) => {
  const body = request.body
  if(!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  const book = {
    ...body,
    id: generateId()
  }
  books = books.concat(book)

  response.json(book)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})