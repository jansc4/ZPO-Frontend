import './BookElement.css';
import { Box } from '@mui/material';
import React from 'react';

interface BookElementProps {
  title: string;
  author: string;
  year: number;
}

function BookElement(props: BookElementProps) {
  const { title, author, year } = props;

  return (
    <div className="BookElement">
      <Box
        className="customBox" // Dodanie klasy CSS do komponentu Box
        component="div" // Komponent Box jako div
        onMouseEnter={() => {}} // Dowolna obsługa zdarzenia
      >
        {title} - {author} - {year}
      </Box>
    </div>
  );
}

export default BookElement;
