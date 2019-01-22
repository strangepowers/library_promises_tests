setTimeout(function() {
  console.log('in settimeout')
}, 3000)
const processString = str => {
  let retStr = ''
  setTimeout(function() {
    retStr = str + str
  }, 0)
  return retStr
}

let foo = processString('bar')
console.log(foo)

const processStringImproved = (str, callback) => {
  setTimeout(function() {
    callback(str + str)
  }, randomTimeInverval())
}

processStringImproved('bar', function(res) {
  console.log('res is ', res)
})

let processStringPromise = str => {
  return new Promise((resolve, reject) => {
    processStringImproved(str, resolve)
  })
}

// this will not work!
/* 
let processStringPromise = (str) => {
  return processStringImproved(Promise.resolve)
}
*/

processStringPromise('fizzbuzz').then(function(res) {
  console.log('res is ', res)
})

processStringToInt = str => {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(str.length)
    }, randomTimeInverval())
  })
}

processInt = int => {
  return Promise.resolve(Math.atan(int))
}

processStringPromise('karstark')
  .then(function(res) {
    return processStringToInt(res)
  })
  .then(function(res) {
    console.log('karstark res is', res)
    return processInt(res)
  })
  .then(function(res) {
    console.log('final res is', res)
  })

// show how processStringPromise can't access it's internals directly

let myBookShelf = []
let booksIveRead = []

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
    if (book.checked_out === false) {
      myBookShelf.push(book)
      book.checked_out = true
      resolve(book.title)
    } else {
      resolve('ALREADY_CHECKED_OUT')
    }
    /*let book = books_json.filter((x) => x.title === title)[0] 
    if(book.checked_out === false) {
      book.checked_out = true 
      resolve(true)
    } else {
      resolve("ALREADY_CHECKED_OUT")
    }*/
  })
}

const readBookNaive = title => {
  console.log('title is ', title)
  let book = myBookShelf.filter(book => book.title === title)[0]
  book.reading = true
  let handle = setInterval(function() {
    console.log('reading ', title)
  }, 500)
  setTimeout(() => {
    clearInterval(handle)
    book.reading = false
    booksIveRead.push(title)
  }, 10000)
}

const readBook = title => {
  return new Promise((resolve, reject) => {
    console.log('title is ', title)
    let book = myBookShelf.filter(book => book.title === title)[0]
    book.reading = true
    let handle = setInterval(function() {
      console.log('reading ', title)
    }, 500)
    setTimeout(() => {
      clearInterval(handle)
      book.reading = false
      booksIveRead.push(title)
      resolve(title)
    }, 10000)
  })
}

const lendBook = title => {
  let book = myBookShelf.filter(book => book.title === title)[0]
}

allBookTitle()
  .then(function(res) {
    return res[0]
  })
  .then(function(title) {
    return bookByTitle(title)
  })
  .then(function(book) {
    console.log('book ', book)
    return checkOutBook(book)
  })
  .then(function(title) {
    return readBook(title)
  })
  .then(function(res) {
    console.log('here!!!')
  })

// I can demo that if checkoutBook takes a while
// then if readBook is immediately called the book won't exist
//
// test out retrieveBook
// test returnBook
// test writeReview on book which returns rating and adds review to list of reviews, returns book title and rating
// test process Review, which takes a title and rating and adds it to recommended list if its greater than 3

function randomTimeInverval() {
  return Math.floor(Math.random() * 850)
}
