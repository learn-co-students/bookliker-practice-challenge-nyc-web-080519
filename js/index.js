document.addEventListener("DOMContentLoaded", function() {

  const listPanel = document.querySelector("#list-panel")
  const showPanel = document.querySelector("#show-panel")
  const booksURL = "http://localhost:3000/books"

  getAllBooks().then(renderBooks)

  function renderBooks(books){
    books.forEach(renderOneBook)
  }

  function renderOneBook(book){
    const info = `
      <li id=${book.id}>${book.title}</li>
    `
    listPanel.insertAdjacentHTML('beforeend', info)

    listPanel.addEventListener('click', clickOnBook)

  }

  function clickOnBook(e){
    bookId = e.target.id 
    getOneBook(bookId).then(showBookInfo)
  }

  function showBookInfo(book){
    showPanel.innerHTML = "" 
    const usersArr = book.users
    const bookInfo = `
      <div>
        <h2>${book.title}</h2>
        <img src="${book.img_url}"/>
        <p>${book.description}</p>
        <ul id='users-list'>       </ul>
        <button class="button" data-id=${book.id} data-action="read">Read Book</button>
      </div>
    `
    showPanel.insertAdjacentHTML('beforeend', bookInfo)

    //adding the usernames
    if(usersArr.length !== 0){
      usersArr.forEach(user => {
        const users = document.getElementById("users-list")
        const userInfo = `
        <li id=${user.id}>${user.username}</li>
        `
        users.insertAdjacentHTML('beforeend', userInfo)
      })
    }
    showPanel.addEventListener('click', clickOnReadBook)  
  }

  function clickOnReadBook(e){
    if(e.target.dataset.action === "read"){
      const bookId = e.target.dataset.id
      getOneBook(bookId).then(book => {
        const usersArr = book.users 
          let usersUl = e.target.closest("div").querySelector("ul") //node
          const listItem = usersUl.getElementsByTagName("li")
          let inList = false

          for (let i = 0; i < listItem.length; i++) {
            if (parseInt(listItem[i].id) === 1) {
              inList = true
            }
          }
          if (!inList) {
            usersArr.push({id: 1, username: "pouros"})
            updateBookReads(bookId, usersArr).then(book => {
              book.users = usersArr
              const li = document.createElement("li");
              li.innerText = "pouros"
              li.id = "1"
              usersUl.appendChild(li)
            })
          } else {
            return alert("Already read!")
          }
      })


 
    }
  }



  //FETCHES
  function getAllBooks(){
    return fetch(booksURL)
      .then(resp => resp.json())
  }

  function getOneBook(bookId){
    return fetch(booksURL + `/${bookId}`)
      .then(resp => resp.json())
  }

  function updateBookReads(bookId, usersArr){
    console.log(usersArr)
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({users: usersArr})
    }

    
    return fetch(booksURL + `/${bookId}`, options)
      .then(resp => resp.json())
  }





























}); //end of DOMContentLoaded


