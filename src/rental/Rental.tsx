import React from 'react';
import { Box, Typography } from '@mui/material';
import './Rental.css';

import { GetBookDto } from '../api/dto/book.dto';
import { GetUserDto } from '../api/dto/user.dto';

interface RentalProps {
  loanId: number;
  book: GetBookDto | null;
  user: GetUserDto | null;
  rentalDate: Date | null;
  endRentalDate: Date | null;
  returnDate: Date | null;
}

function Rental(rental: RentalProps) {
  const { loanId, book, user, rentalDate, endRentalDate, returnDate } = rental;

  return (
    <Box className="rental-container">
      <Typography variant="h6" gutterBottom>
        Wypożyczenie #{loanId}
      </Typography>
      <div className="rental-details">
        <div className="detail">
          <Typography variant="subtitle1">Książka:</Typography>
          <Typography variant="body1" className={book ? '' : 'missing-data'}>
            {book ? `${book.title} (${book.author})` : 'Brak danych'}
          </Typography>
        </div>
        <div className="detail">
          <Typography variant="subtitle1">Użytkownik:</Typography>
          <Typography variant="body1" className={user ? '' : 'missing-data'}>
            {user ? `${user.name} (${user.userName})` : 'Brak danych'}
          </Typography>
        </div>
        <div className="detail">
          <Typography variant="subtitle1">Data wypożyczenia:</Typography>
          <Typography variant="body1">
            {rentalDate
              ? new Date(rentalDate).toLocaleDateString()
              : 'Brak danych'}
          </Typography>
        </div>
        <div className="detail">
          <Typography variant="subtitle1">Planowana data zwrotu:</Typography>
          <Typography variant="body1">
            {endRentalDate
              ? new Date(endRentalDate).toLocaleDateString()
              : 'Brak danych'}
          </Typography>
        </div>
        <div className="detail">
          <Typography variant="subtitle1">Data zwrotu:</Typography>
          <Typography variant="body1">
            {returnDate
              ? new Date(returnDate).toLocaleDateString()
              : 'Brak danych'}
          </Typography>
        </div>
      </div>
    </Box>
  );
}

export default Rental;
