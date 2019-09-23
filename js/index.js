document.addEventListener("DOMContentLoaded", function() {
    const books = document.querySelector('#list')
    const showBook = document.querySelector("#show-panel")

    fetch("http://localhost:3000/books")
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        data.forEach(function(book) {
            books.insertAdjacentHTML("beforeend",
            `<li data-action="book" data-id="${book.id}">${book.title}</li>`)
        })
    })

    document.addEventListener("click", function(e) {
        if (e.target.dataset.action === "book") {
            fetch(`http://localhost:3000/books/${e.target.dataset.id}`)
            .then(function(response) {
                return response.json()
            })
            .then(function(book) {
                showBook.innerHTML = ""
                showBook.insertAdjacentHTML("beforeend",
                `<img src="${book.img_url}">
                <h2>${book.title}</h2>
                <h3>${book.description}</h3>
                <ul id="user-list"></ul>
                <button data-action="like" data-id="${book.id}">Like</button>`)

                const userList = document.querySelector("#user-list")
                book.users.forEach(function(user) {
                    userList.insertAdjacentHTML("beforeend",
                    `<li>${user.username}</li>`)
                })
            })
        }
        else if (e.target.dataset.action === "like") {
            const book = e.target.closest("#show-panel")
            fetch(`http://localhost:3000/books/${e.target.dataset.id}`)
            .then(function(response) {
                return response.json()
            })
            .then(function(book) {
                let bookUsers = book.users
                const found = bookUsers.find(function(user) {
                    return user.id === 1
                })
                if (found) {
                    bookUsers = bookUsers.filter(function(user) {
                        return user.id != 1
                    })
                    fetch(`http://localhost:3000/books/${e.target.dataset.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({users: bookUsers})
                    })
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(book) {
                        showBook.innerHTML = ""
                        showBook.insertAdjacentHTML("beforeend",
                        `<img src="${book.img_url}">
                        <h2>${book.title}</h2>
                        <h3>${book.description}</h3>
                        <ul id="user-list"></ul>
                        <button data-action="like" data-id="${book.id}">Like</button>`)
        
                        const userList = document.querySelector("#user-list")
                        book.users.forEach(function(user) {
                            userList.insertAdjacentHTML("beforeend",
                            `<li>${user.username}</li>`)
                        })
                    })
                }
                else {
                    bookUsers.push({"id":1, "username":"pouros"})

                    fetch(`http://localhost:3000/books/${e.target.dataset.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({users: bookUsers})
                    })
                    .then(function(response) {
                        return response.json()
                    })
                    .then(function(book) {
                        showBook.innerHTML = ""
                        showBook.insertAdjacentHTML("beforeend",
                        `<img src="${book.img_url}">
                        <h2>${book.title}</h2>
                        <h3>${book.description}</h3>
                        <ul id="user-list"></ul>
                        <button data-action="like" data-id="${book.id}">Like</button>`)
        
                        const userList = document.querySelector("#user-list")
                        book.users.forEach(function(user) {
                            userList.insertAdjacentHTML("beforeend",
                            `<li>${user.username}</li>`)
                        })
                    })
                }
            })
        }
    })
});
