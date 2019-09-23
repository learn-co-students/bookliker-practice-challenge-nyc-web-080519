document.addEventListener("DOMContentLoaded", function() {

    // -------------- DECLARE AND EXECUTE --------------

    const list = document.querySelector("div#list-panel")
    const showDiv = document.querySelector("div#show-panel")
    let books = []
    const user = { "id": 1, "username": "pouros" }

    getBooks().then(data =>{
        books = data
        renderList(books)
    })

    // -------------- OPERATE --------------

    function getBooks() {
        return fetch("http://localhost:3000/books")
        .then(resp => resp.json())
    }

    function renderList(books) {
        books.forEach(book => {
            list.insertAdjacentHTML("beforeend", `
                <li class="listedBooks" id="${book.id}"> ${book.title} </li>
            `)
        })
    }

    function showBook(bookTitle) {
        while (showDiv.firstChild){
            showDiv.removeChild(showDiv.firstChild);
        }

        let bookOBJ = books.find(book => { return book.title === bookTitle })
        
        showDiv.insertAdjacentHTML("beforeend", `
            <h2> ${bookOBJ.title} </h2>
            <img src="${bookOBJ.img_url}">
            <p>${bookOBJ.description}</p>
            <button class="likeButton" id="${bookOBJ.id}">Like Book</button>
            <ul id="userUL"></ul>
        `)

        if (bookOBJ.users[0]) {
            userUL = document.querySelector("#userUL")

            bookOBJ.users.forEach(user => {
                userUL.insertAdjacentHTML("beforeend", `
                    <li>${user.username}</li>
                `)
            })
                
        }

    }

    function likeBook(bookID) {
        let bookOBJ = books.find(book => { return book.id === parseInt(bookID) })
        // debugger
        let newUsers = bookOBJ.users
        newUsers.push(user)

        result = fetch(`http://localhost:3000/books/${bookID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({users: newUsers})
        })
        .then(resp => resp.json())
        .then(showBook(bookOBJ.title))
    }


    // -------------- LISTEN --------------

    document.addEventListener("click", e => {
        if (e.target.className === "listedBooks") {
            showBook(e.target.innerText)
        }
    })

    document.addEventListener("click", e => {
        if (e.target.className === "likeButton") {
            likeBook(e.target.id)
        }
    })

});
