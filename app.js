// Book Constructor
function Book (title, auther, isbn) {
  this.title = title
  this.auther = auther
  this.isbn = isbn
}

// UI constructor
function UI () {}

UI.prototype.addBookToList = function (book) {
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

// show alert
UI.prototype.showAlert = function (message, className) {
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

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('auther').value = ''
  document.getElementById('isbn').value = ''
}

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

  // show message
  ui.showAlert('Book Removed!', 'success')

  e.preventDefault()
})
