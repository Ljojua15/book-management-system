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
export class BooksComponent {
  title: string = '';
  author: string = '';
  allBooks: Books[] = [];

  // ngOnInit(): void {
  //   if (typeof localStorage !== 'undefined') {
  //     const data = localStorage.getItem('books');
  //     this.addBook = data ? JSON.parse(data) : [];
  //   } else {
  //     console.warn('localStorage is not available');
  //   }
  // }

  addBook() {
    if (this.trimed()) {
      let inputedNames: Books = {
        id: this.allBooks.length + 1,
        title: this.title,
        author: this.author,
      };

      this.allBooks.push(inputedNames);
      localStorage.setItem('books', JSON.stringify(this.allBooks));
    }

    this.title = '';
    this.author = '';
  }

  removeBook(i: number) {
    this.allBooks.splice(i, 1);
    localStorage.setItem('books', JSON.stringify(this.allBooks));
  }

  trimed() {
    return this.title.trim().length && this.author.trim().length;
  }
}
