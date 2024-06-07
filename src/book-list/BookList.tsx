import React, { useState } from 'react';
import { List, ListItem, Checkbox, ListSubheader } from '@mui/material';
import Book from '../book/Book';
import './BookList.css';
import { GetBookDto } from '../api/dto/book.dto';

interface BookListProps {
  books: GetBookDto[];
}

function BookList({ books }: BookListProps) {
  const [checked, setChecked] = useState<number[]>([]);

  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  //console.log(books[0]);
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
        {books.map((book, index) => (
          <ListItem key={index} dense button onClick={handleToggle(index)}>
            <Checkbox
              edge="start"
              checked={checked.indexOf(index) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
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
