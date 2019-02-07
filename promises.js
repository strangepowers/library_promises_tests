let myBookShelf = []
let booksIveRead = []
let reviewedBooks = []

/// books_json is defined in history_books.js

const allBookTitle = () => {
  return new Promise((resolve, reject) => {
    resolve(books_json.map(x => x.title))
  })
}

const bookByTitle = title => {
  return new Promise((resolve, reject) => {
    let book = books_json.filter(x => x.title === title)[0]
    resolve(book)
  })
}

const checkOutBook = book => {
  return new Promise((resolve, reject) => {
  })
}


const readBook = title => {
  return new Promise((resolve, reject) => {
  })
}

const reviewBook = (title) => {
  return new Promise((resolve, reject) => {
  })
}

const returnBook = (title) => {
  return new Promise((resolve, reject) => {
  })
}

const willRead = (score, hasBeenReturned)  => {
  return new Promise((resolve, reject) => {
  })
}
