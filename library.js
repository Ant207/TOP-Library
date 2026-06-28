
const dialog = document.getElementById('book-dialog');
const newBookBtn = document.getElementById('new-book');
const myLibrary = [];
const form = document.getElementById('book-form');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
    toggleRead() { this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayLibrary() {
    const tbody = document.getElementById("library-body");
    tbody.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const book =myLibrary[i];

        const row = document.createElement("tr");

        const title = document.createElement('td');
        title.textContent = book.title;

        const author = document.createElement('td');
        author.textContent = book.author;

        const pages = document.createElement('td');
        pages.textContent = book.pages;

        const read = document.createElement('td');
        read.textContent = book.read ? 'Yes' : 'No';

        const toggle = document.createElement('td');

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = book.read ? 'Read' : 'Unread';
        toggleBtn.dataset.id = book.id;

        toggleBtn.addEventListener('click', () => {
            const id = toggleBtn.dataset.id;
            const target = myLibrary.find(book => book.id === id);
            target.toggleRead();
            displayLibrary();
        });

        const remove = document.createElement('td');

        const removeBtn = document.createElement('button');

        removeBtn.textContent = 'Remove';
        removeBtn.dataset.id = book.id;

        removeBtn.addEventListener('click', () => {
            const id =removeBtn.dataset.id;
            const index = myLibrary.findIndex(book => book.id === id);
            myLibrary.splice(index, 1);
            displayLibrary();
        })

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        toggle.appendChild(toggleBtn);
        row.appendChild(toggle);
        remove.appendChild(removeBtn);
        row.appendChild(remove);
        tbody.appendChild(row);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    displayLibrary();
    dialog.close();
    form.reset();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
    dialog.close();
    form.reset();
});

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});


removeBtn.addEventListener('click', () => {
    const id = removeBtn.dataset.id;

    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
    displayLibrary();
});

