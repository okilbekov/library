const booksRouter = require('express').Router()
const Book = require('../models/book')

booksRouter.get('/', (request, response) => {
  Book.find({})
    .then(books => {
      response.json(books)
    })
})

booksRouter.get('/:id', (request, response, next) => {
  Book.findById(request.params.id)
    .then(book => {
      response.json(book)
    })
    .catch(error => next(error))
})

booksRouter.delete('/:id', (request, response, next) => {
  Book.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

booksRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const book = {
    ...body
  }

  Book.findByIdAndUpdate(request.params.id, book, { new: true })
    .then(updatedBook => {
      response.json(updatedBook)
    })
    .catch(error => next(error))
})

booksRouter.post('/', (request, response, next) => {
  const body = request.body
  if(body.title === undefined) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  const book = new Book({
    ...body,
  })
  
  book.save()
    .then(savedBook => {
      response.json(savedBook)
    })
    .catch(error => next(error))
})

module.exports = booksRouter