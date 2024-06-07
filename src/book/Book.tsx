import React from 'react';
import { Typography } from '@mui/material';
import './Book.css';

interface BookElementProps {
  id: number;
  isbn: number;
  title: string;
  author: string;
  publisher: string;
  publicationYear: number;
  isAvailable: boolean;
}

function Book(props: BookElementProps) {
  const { id, isbn, title, author, publisher, publicationYear, isAvailable } =
    props;
  // console.log(isAvailable);
  return (
    <div className="book-container">
      <div className="book-icon">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios/50/book--v1.png"
          alt="book--v1"
        />
      </div>
      <div className="book-main-data">
        <Typography className="book-title" variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography
          className="book-author"
          variant="body2"
          color="textSecondary"
        >
          {id} - {author}
        </Typography>
      </div>
      <hr className="divider" />
      <div className="book-secondary-data">
        <Typography className="book-isbn" variant="body1" color="white">
          {isbn}
        </Typography>
        <Typography className="book-pub" variant="body2" color="textSecondary">
          {publisher} - {publicationYear} -
          <span
            className={`availability ${isAvailable ? 'available' : 'not-available'}`}
          >
            {isAvailable ? 'Available' : 'Not Available'}
          </span>
        </Typography>
      </div>
    </div>
  );
}

export default Book;
