class Book {
  constructor (title, auther, isbn) {
    this.title = title
    this.auther = auther
    this.isbn = isbn
  }
}

class UI {
  addBookToList (book) {
    const list = document.getElementById('book-list')
    // create tr element
    const row = document.createElement('tr')
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.auther}</td>
    <td>${book.isbn}</td>
    <td><a href"#" class="delete">X</a></td>
    `

    list.appendChild(row)
  }

  showAlert (message, className) {
    // Create div
    const div = document.createElement('div')
    // Add Classes
    div.className = `alert ${className}`
    // Add Text
    div.appendChild(document.createTextNode(message))

    // get parend
    const container = document.querySelector('.container')
    // get form
    const form = document.querySelector('#book-form')
    // Insert Alert
    container.insertBefore(div, form)

    // Timeout after
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 3000)
  }

  deleteBook (target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  clearFields () {
    document.getElementById('title').value = ''
    document.getElementById('auther').value = ''
    document.getElementById('isbn').value = ''
  }
}

// LocalStorage Class
class Store {
  static getBooks () {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }
  static displayBooks () {
    const books = Store.getBooks()

    books.forEach(function (book) {
      const ui = new UI()

      // Add book to UI
      ui.addBookToList(book)
    })
  }

  static addBook (book) {
    const books = Store.getBooks()
    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook (isbn) {
    const books = Store.getBooks()

    books.forEach(function (book, index) {
      if (book.isbn == isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks())

// Event Listener for submit

document.getElementById('book-form').addEventListener(
  'submit',

  function (e) {
    // Get form values
    const title = document.getElementById('title').value,
      auther = document.getElementById('auther').value,
      isbn = document.getElementById('isbn').value

    //   Instantiate Book
    const book = new Book(title, auther, isbn)

    //   Instantiate UI
    const ui = new UI()

    //   Validate
    if (title === '' || auther === '' || isbn === '') {
      // Error alert
      ui.showAlert('Please fill in all fields', 'error')
    } else {
      // Add book to list
      ui.addBookToList(book)

      // add to loacalstorage
      Store.addBook(book)

      // Show Success
      ui.showAlert('Bood Added!', 'success')

      //   clear fields
      ui.clearFields()
    }

    console.log(book)
    e.preventDefault()
  }
)

// Event listener for delete

document.getElementById('book-list').addEventListener('click', function (e) {
  // Inbstantiate UI
  const ui = new UI()
  // Delete Book
  ui.deleteBook(e.target)

  // Remove from localstorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  // show message
  ui.showAlert('Book Removed!', 'success')

  e.preventDefault()
})
