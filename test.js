mocha.setup('bdd')


describe('#checkOutBook', function(){
  it('after checking out a book, it should be made available in the myBookShelf array', function(done){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(res){
      chai.assert.notEqual(myBookShelf.findIndex(x => x.title === "Macbeth", -1))
      chai.assert.equal("Macbeth", res)
      // reset myBookShelf to empty array after test has finished
      myBookShelf = []
      done()
    })
  })
})

describe('#readBook', function(){
  it('should only allow you to read books available in the myBookShelf array', function(done){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return readBook(res) 
    }).catch(function(res){
      chai.assert.equal('book unavailable in myBookShelf', res.message)
      done()
    })
  })

  it('after book has been read, it should be added to the booksIveRead array', function(done){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(res){
      console.log("my bookshelf i99 ", myBookShelf)
      return readBook(res)
    }).then(function(res){
      chai.assert.notEqual(booksIveRead.findIndex(x => x === "Macbeth", -1))
      done()
    }).catch(function(err){
      done()
    })
  })
})

describe('#reviewBook', function() {
  it('should write a review for Ab urbe condita, put it in array, and return a rating which should be cover_id mod 10', function(done){
    return reviewBook("Ab urbe condita").then(function(value){
      chai.assert.equal(value, 3)
      chai.assert.equal(reviewedBooks.includes("Ab urbe condita"), true)
      reviewedBooks = []
      done()
    }) 
  }) 
  it('should write a review for Macbeth put it in array, and return a rating which should be cover_id mod 10', function(done){
    return reviewBook("Macbeth").then(function(value){
      chai.assert.equal(value, 9)
      chai.assert.equal(reviewedBooks.includes("Macbeth"), true)
      reviewedBooks = []
      done()
    }) 
  }) 
})

describe('#returnBook', function(){
  it('after checking out a book, if it is returned, it should no longer be marked as checked out', function(done){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(res){
      //let p1 = reviewBook("Macbeth") 
      return returnBook("Macbeth")
    }).then(function(res){
      chai.assert.equal(false, books_json.filter((book) => book.title === "Macbeth")[0].checked_out) 
      chai.assert.equal(myBookShelf.findIndex(x => x.title === "Macbeth"), -1)
      done()
    })
  })
})



describe('#willRead', function(){
  it('should return true if the reviewed book has a score greater then 7 and has been returned', function(done){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(title){
      // reviewing and returning book can take place in any order
      let p1 = reviewBook(title) 
      let p2 = returnBook(title)
      return Promise.all([p1, p2])
    }).then(function(values){
      return willRead(values[0], values[1])
    }).then(function(res){
      chai.assert.equal(res, true) 
      done()
    })
  })
    
  it('should return true if the reviewed book has a score greater then 7 and has been returned', function(done){
    let promise = bookByTitle('Ab urbe condita') 
    promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(title){
      let p1 = reviewBook(title) 
      let p2 = returnBook(title)
      return Promise.all([p1, p2])
    }).then(function(values){
      return willRead(values[0], values[1])
    }).then(function(res){
      chai.assert.equal(res, false) 
      done()
    })
  })

  it('should return true if the reviewed book has a score greater then 7 and has been returned', function(done){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(title){
      // reviewing and returning book can take place in any order
      let p1 = reviewBook(title) 
      //let p2 = returnBook(title)
      return p1
    }).then(function(values){
      return willRead(values[0], values[1])
    }).then(function(res){
      chai.assert.equal(res, false) 
      done()
    })
  })
})

mocha.run()
