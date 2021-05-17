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
}

class Store {}

form.addEventListener('submit', addBook);

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
	}
	event.preventDefault();
}
