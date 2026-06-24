
const dialog = document.getElementById('book-dialog');
const newBookBtn = document.getElementById('new-book');
const myLibrary = [];
const form = document.getElementById('book-form');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "Tolkien", 310, true);

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

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);

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
