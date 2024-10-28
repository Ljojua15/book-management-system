import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Books } from '../../models/books';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent implements OnInit {
  title: string = '';
  author: string = '';
  allBooks: Books[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const data = window?.localStorage.getItem('books');
        console.log(data, 'test');

        this.allBooks = data ? JSON.parse(data) : [];
      }
    }, 1500);
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
  }

  trimed() {
    return this.title.trim().length && this.author.trim().length;
  }
}
