document.addEventListener("DOMContentLoaded", function() {

    const list = document.querySelector("#list");
    const listPanel = document.querySelector("#list-panel")
    const showPanel = document.querySelector("#show-panel")

    fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(json => listBooks(json));

    listPanel.addEventListener("click", function(e) {
        fetch(`http://localhost:3000/books/${e.target.dataset.book_id}`)
        .then(response => response.json())
        .then(json => showBook(json));
    });

    showPanel.addEventListener("click", function(e) {
        if (e.target.className === "like") {
            console.log(`${e.target}`)
            let userArray = [];
            let list = e.target.parentElement.querySelector(".user-list").children;
            for (let i = 0; i < list.length; i++) {
                userArray.push({"id":list[i].dataset.user_id, "username":list[i].innerText})
            }
            let myLi = document.createElement('li')
            showPanel.querySelector(".user-list").appendChild(myLi)
            showPanel.querySelector(".user-list").lastChild.innerHTML = "pouros"
            userArray.push({"id":1, "username":"pouros"});
            fetch(`http://localhost:3000/books/${e.target.dataset.like_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accepts": "application/json"
                },
                body: JSON.stringify({
                    "users": userArray
                })
            })
        }
    })

    function listBooks(books) {
        for (let i = 0; i < books.length; i++) {
            list.insertAdjacentHTML("beforeend", `<li data-book_id="${books[i].id}">${books[i].title}</li>`);
        }
    };

    function showBook(book) {
        if (book.users) {
            const myArr = [];   
        }
        let html = ""
        showPanel.innerHTML = ("beforeend",
        `<img src="${book.img_url}">
        <p>${book.description}</p>
        <button class="like" data-like_id=${book.id}>Like!</button>`)
        if (book.users.length > 0) {
            html += "<ul class='user-list'>"
            for (let i = 0; i < book.users.length; i++) {
                html += `<li data-user_id="${book.users[i].id}">${book.users[i].username}</li>`;
            }
            html += "</ul>"
        }
        showPanel.insertAdjacentHTML("beforeend", html)
    };

});
