document.addEventListener("DOMContentLoaded", function () {

  const baseURL = "http://localhost:3000/books"
  const listPanelUl = document.querySelector("#list") //where book names goes
  const showPanel = document.querySelector("#show-panel") //where book info goes
  let booksData;

  //Get a list of books & render them
  http://localhost:3000/books

  getBooks().then(showBooks)

  function showBooks(books) {
    booksData = books
    books.forEach(renderOneBook)
  }

  function renderOneBook(book) {
    const bookTitle = `<li id=${book.id}>${book.title}</li>`
    listPanelUl.insertAdjacentHTML('beforeend', bookTitle)
  }

  //Be able to click on a book, you should see the book's thumbnail and description and a list of users who have liked the book.
  listPanelUl.addEventListener('click', clickOnBook)

  function clickOnBook(e) {
    const bookId = parseInt(e.target.id)
    showBookInfo(e.target.id)
  }

  function showBookInfo(bookId) {
    showPanel.innerHTML = ""
    const bookMatch = booksData.find(book => book.id === parseInt(bookId))
    const usersLi = bookMatch.users.map(user => {
      return `<li>${user.username}</li>`
    })


    const bookInfo = `
    <div>
      <h1>${bookMatch.title}</h1>
      <img src="${bookMatch.img_url}">
      <p>${bookMatch.description}</p>
      <ul ${bookMatch.id}>${usersLi.join("")}</ul>
      <button data-id=${bookMatch.id}>Read Book</button>
    </div>
    `
    showPanel.insertAdjacentHTML('beforeend', bookInfo)
  }

  //You can read a book by clicking on a button.You are user 1 { "id": 1, "username": "pouros" }, so to like a book send a PATCH request to http://localhost:3000/books/:id with an array of users who like the book. This array should be equal to the existing array of users that like the book, plus your user. 

  showPanel.addEventListener('click', clickRead)

  function clickRead(e) {
    const bookId = e.target.dataset.id
    const bookMatch = booksData.find(book => book.id === parseInt(bookId))
    let bookMatchUsers = bookMatch.users
    const filterForUser = bookMatchUsers.filter(user => user.id === 1)
    bookMatchUsers.push({ "id": 1, "username": "pouros" })
    if (e.target.innerText === "Read Book" && filterForUser.length === 0) {
      patchUserToList(bookId, bookMatchUsers).then(addBookUser)
    } else if (filterForUser.length > 0) {
      alert("You've already liked this book!")
    }
  }

  function addBookUser(book) {
    showPanel.innerHTML = ""
    const bookId = book.id
    const usersLi = book.users.map(user => {
      return `<li>${user.username}</li>`
    })

    const bookInfo = `
    <div>
      <h1>${book.title}</h1>
      <img src="${book.img_url}">
      <p>${book.description}</p>
      <ul ${bookId}>${usersLi.join("")}</ul>
      <button data-id=${bookId}>Read Book</button>
    </div>
    `
    showPanel.insertAdjacentHTML('beforeend', bookInfo)
  }

  //this route will respond with the updated book json including the list of users who have liked the book.


  //FETCHES -------------------------------

  function getBooks() {
    return fetch(baseURL)
      .then(resp => resp.json())
  }

  function patchUserToList(bookId, bookMatchUsers) {
    const options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "users": bookMatchUsers
      })
    }

    return fetch(baseURL + `/${bookId}`, options)
      .then(resp => resp.json())
  }



});


//OLD VERSION
// document.addEventListener('DOMContentLoaded', function (e) {
  
//   const listPanel = document.querySelector("#list-panel")
//   const showPanel = document.querySelector("#show-panel")
//   const booksURL = "http://localhost:3000/books"

//   getBooks().then(addBooksToList)

//   function addBooksToList(books){
//     books.forEach(renderOneBook)
//   }

//   function renderOneBook(book){
//     const info = `
//       <li id=${book.id}>${book.title}</li>
//     `
//     listPanel.insertAdjacentHTML('beforeend', info)
//     listPanel.addEventListener('click', clickBook)
//   }

//   function clickBook(e){
//     const bookId = e.target.id
//     getOneBook(bookId)
//       .then(showBookInfo)
//   }

//   function showBookInfo(book){
//     showPanel.innerHTML = ""
//     const usersArr = book.users
//     const bookInfo = `
//       <div>
//         <h2>${book.title}</h2>
//         <img src="${book.img_url}"/>
//         <p>${book.description}</p>
//         <ul id='users-list'>       </ul>
//         <button class="button" data-id=${book.id} data-action="read">Read Book</button>
//       </div>
//     `
//     showPanel.insertAdjacentHTML('beforeend', bookInfo)


//     //adding the usernames
//     if (usersArr.length !== 0) {
//       usersArr.forEach(user => {
//         const users = document.getElementById("users-list")
//         const userInfo = `
//         <li id=${user.id}>${user.username}</li>
//         `
//         users.insertAdjacentHTML('beforeend', userInfo)
//       })
//     }
//     showPanel.addEventListener('click', clickOnReadBook)  
//   }
  


//   //FETCHES
//   function getBooks(){
//     return fetch(booksURL)
//     .then(resp => resp.json())
//   }

//   function getOneBook(bookId){
//     return fetch(booksURL + `/${bookId}`)
//       .then(resp => resp.json())
//   }
  




// }); //End of DOMContentLoaded
 