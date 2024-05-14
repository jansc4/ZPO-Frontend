import React from 'react';
import { Typography } from '@mui/material';

import './Book.css';

interface BookElementProps {
  title: string;
  author: string;
  year: number;
}

function Book(props: BookElementProps) {
  const { title, author, year } = props;
  return (
    <div className="book-container">
      <div className="book-icon">
        <img
          // width="50"
          // height="50"
          src="https://img.icons8.com/ios/50/book--v1.png"
          alt="book--v1"
        />
      </div>
      <div>
        <Typography className="book-title" variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Typography
          className="book-author"
          variant="body2"
          color="textSecondary"
        >
          {author} - {year}
        </Typography>
      </div>
    </div>
  );
}

export default Book;
