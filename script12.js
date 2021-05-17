'use strict';
let form = document.querySelector('#book_form');
let bList = document.querySelector('#book_list');

class Books {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class Interface {
	static showAlert(message, className) {
		let pTag = document.createElement('p');
		pTag.className = `alert ${className}`;
		pTag.append(document.createTextNode(message));
		let cont = document.querySelector('.container');
		cont.insertBefore(pTag, form);

		setTimeout(() => document.querySelector('.alert').remove(), 1000);
	}

	static addNewBook(book) {
		let row = document.createElement('tr');
		row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#">Remove</a></td>
		`;
		bList.append(row);
	}

	static clearForm() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}

	static displayAgain(target) {
		if (target.hasAttribute('href')) {
			target.parentElement.parentElement.remove();
			Store.rBk(target.parentElement.previousElementSibling.textContent.trim());
			Interface.showAlert('Removed!!!', 'success');
		}
	}
}

class Store {
	static keepBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static addToStore(book) {
		let books = Store.keepBooks();
		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}

	static displayBooks() {
		let books = Store.keepBooks();
		books.forEach(book => Interface.addNewBook(book));
	}

	static rBk(isbn) {
		let books = Store.keepBooks();
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}

form.addEventListener('submit', addBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());
bList.addEventListener('click', removeBook);

function addBook(event) {
	let title = document.querySelector('#title').value;
	let author = document.querySelector('#author').value;
	let isbn = document.querySelector('#isbn').value;

	if (title == '' || author == '' || isbn == '') {
		Interface.showAlert('Fill the Fields', 'error');
	} else {
		let book = new Books(title, author, isbn);
		Interface.showAlert('Success!!!', 'success');
		Interface.addNewBook(book);
		Interface.clearForm();
		Store.addToStore(book);
	}
	event.preventDefault();
}

function removeBook(event) {
	Interface.displayAgain(event.target);
	event.preventDefault();
}
