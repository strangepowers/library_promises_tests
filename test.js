mocha.setup('bdd')

describe('#reviewBook', function() {
  it('should write a review for Ab urbe condita, put it in array, and return a rating which should be cover_id mod 10', function(){
    return reviewBook("Ab urbe condita").then(function(value){
      chai.assert.equal(value, 3)
      chai.assert.equal(reviewedBooks.includes("Ab urbe condita"), true)
      reviewedBooks = []
    }) 
  }) 
  it('should write a review for Macbeth put it in array, and return a rating which should be cover_id mod 10', function(){
    return reviewBook("Macbeth").then(function(value){
      chai.assert.equal(value, 9)
      chai.assert.equal(reviewedBooks.includes("Macbeth"), true)
      reviewedBooks = []
    }) 
  }) 
})

describe('#', function(){
  it('', function(){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(res){
      chai.assert.notEqual(myBookShelf.findIndex(x => x.title === "Macbeth", -1))
      myBookShelf = []
    })
  })
})

describe('#', function(){
  it('', function(){
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(res){
      let p1 = reviewBook("Macbeth") 
      return returnBook("Macbeth")
    }).then(function(res){
      chai.assert.equal(false, books_json.filter((book) => book.title === "Macbeth")[0].checked_out) 
    })
  })
})



describe('#', function(){
  it('', function(){
    fazzzer = books_json
    let promise = bookByTitle('Macbeth') 
    return promise.then(function(res){
      return checkOutBook(res) 
    }).then(function(title){
      let p1 = reviewBook(title) 
      let p2 = returnBook(title)
      return Promise.all([p1, p2])
    }).then(function(values){
      return willRead(values[0], values[1])
    }).then(function(res){
      chai.assert.equal(res, true) 
    })
  })
    
  it('', function(){
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
    })
  })
})


/*
describe('#mergeObj', function() {
  it('', function(){
   chai.assert.deepEqual(mergeObj({a: 1,  b: 2, c: 3}, {b: 9, d: 4}), {d: 4, a: 1, b: 9, c: 3}) 
  })
})

describe('#wordCount', function() {
  it('', function(){
    chai.assert.deepEqual(wordCount(["de", "e", "e", "f", "e", "a", "b", "a"]), {"de": 1, "e": 3, "f": 1, "a": 2, "b": 1}) 
    chai.assert.deepEqual(wordCount(["x", "y"]) , {"x": 1,"y": 1}) 
  })
})
*/

mocha.run()
