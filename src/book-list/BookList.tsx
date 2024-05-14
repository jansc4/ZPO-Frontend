import React from 'react';
import { List } from '@mui/material';
import Book from '../book/Book';
import './BookList.css';

interface BookListProps {
  books: { title: string; author: string; year: number }[]; // Tablica obiektów reprezentujących książki
}

function BookList({ books }: BookListProps) {
  return (
    <List className="book-list">
      {books.map((book, index) => (
        <Book
          key={index}
          title={book.title}
          author={book.author}
          year={book.year}
        />
      ))}
    </List>
  );
}

export default BookList;
