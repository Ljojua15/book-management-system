import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Books } from '../../models/books';
import { log } from 'console';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  title: string = '';
  author: string = '';
  allBooks: Books[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const data = window?.localStorage.getItem('books');
      console.log(data, 'test');

      this.allBooks = data ? JSON.parse(data) : [];
    }
  }

  addBook() {
    if (this.trimed()) {
      let inputedNames: Books = {
        id: this.allBooks.length + 1,
        title: this.title,
        author: this.author,
      };

      this.allBooks.push(inputedNames);
      window.localStorage.setItem('books', JSON.stringify(this.allBooks));
    }

    this.title = '';
    this.author = '';
  }

  removeBook(i: number) {
    this.allBooks.splice(i, 1);
    window.localStorage.removeItem('books');
    this.allBooks.forEach((books, kh) => {
      books.id = kh + 1;
    });
  }

  trimed() {
    return this.title.trim().length && this.author.trim().length;
  }
}
