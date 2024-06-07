import React, { FormEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import './AddRental.css';
import { Link, useNavigate } from 'react-router-dom';

function AddRental() {
  const [bookId, setBookId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [rentalDate, setRentalDate] = useState<Date | null>(null);
  const [endRentalDate, setEndRentalDate] = useState<Date | null>(null);

  const api = useApi();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rental = {
      book: bookId,
      user: userId,
      rentalDate,
      endRentalDate,
    };

    api.addRental(rental).then(() => {
      navigate('/home/loans'); // Navigate to home after rental is added
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="add-rental">
      <TextField
        label="ID Książki"
        type="number"
        value={bookId}
        onChange={(e) => setBookId(parseInt(e.target.value))}
        className="text-field"
      />
      <TextField
        label="ID Użytkownika"
        type="number"
        value={userId}
        onChange={(e) => setUserId(parseInt(e.target.value))}
        className="text-field"
      />
      <TextField
        label="Data wypożyczenia"
        type="date"
        value={rentalDate}
        onChange={(e) => setRentalDate(new Date(e.target.value))}
        className="text-field"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Planowana data zwrotu"
        type="date"
        value={endRentalDate}
        onChange={(e) => setEndRentalDate(new Date(e.target.value))}
        className="text-field"
        InputLabelProps={{ shrink: true }}
      />
      <Button type="submit" variant="contained" className="submit-button">
        Add rental
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

export default AddRental;
