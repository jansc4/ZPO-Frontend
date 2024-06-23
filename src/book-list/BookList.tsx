import React, { useState } from 'react';
import { List, ListItem, Checkbox, ListSubheader } from '@mui/material';
import Book from '../book/Book';
import './BookList.css';
import { GetBookDto } from '../api/dto/book.dto';

interface BookListProps {
  books: GetBookDto[];
  checked: number[];
  setChecked: React.Dispatch<React.SetStateAction<number[]>>;
}

function BookList({ books, checked, setChecked }: BookListProps) {
  const handleToggle = (bookId: number) => () => {
    const currentIndex = checked.indexOf(bookId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(bookId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="book-list-container">
      <List
        className="book-list"
        subheader={
          <ListSubheader component="div" className="book-list-header">
            Book List
          </ListSubheader>
        }
      >
        {books.map((book) => (
          <ListItem
            key={book.id}
            dense
            button
            onClick={handleToggle(book.id || 0)}
          >
            <Checkbox
              edge="start"
              checked={checked.indexOf(book.id || 0) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{
                'aria-labelledby': `checkbox-list-label-${book.id}`,
              }}
            />
            <div className="book-list-item">
              <Book
                id={book.id || 0}
                isbn={book.isbn || 0}
                title={book.title || ''}
                author={book.author || ''}
                publisher={book.publisher || ''}
                publicationYear={book.publicationYear || 0}
                isAvailable={book.isAvailable || false}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default BookList;
