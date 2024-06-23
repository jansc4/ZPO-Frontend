import React, { FormEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import './ReturnBook.css';
import { Link, useNavigate } from 'react-router-dom';

function ReturnBook() {
  const [loanId, setLoanId] = useState(0);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const api = useApi();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const returnBookData = {
      loanId,
      returnDate: returnDate || new Date(),
    };

    api.returnBook(returnBookData).then(() => {
      navigate('/home/loans'); // Navigate to home after book is returned
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="return-book">
      <TextField
        label="ID Wypożyczenia"
        type="number"
        value={loanId}
        onChange={(e) => setLoanId(parseInt(e.target.value))}
        className="text-field"
      />
      <TextField
        label="Data zwrotu"
        type="date"
        value={returnDate ? returnDate.toISOString().split('T')[0] : ''}
        onChange={(e) => setReturnDate(new Date(e.target.value))}
        className="text-field"
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" className="submit-button">
        Return book
      </Button>
      <Button
        variant="contained"
        component={Link}
        to="/home/loans"
        sx={{ m: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default ReturnBook;
