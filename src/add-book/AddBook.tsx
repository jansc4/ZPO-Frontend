import React, { FormEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import './AddBook.css';
import { Link, useNavigate } from 'react-router-dom';

function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const [isbn, setIsbn] = useState(0);
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState(0);
  const [availableCopies, setAvailableCopies] = useState(0);

  const api = useApi();
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const book = {
      title,
      author,
      isbn,
      publisher,
      publicationYear,
      availableCopies,
    };

    api.addBook(book).then(() => {
      navigate('/home'); // Navigate to home after book is added
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="add-book">
      <TextField
        label="Tytuł"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-field"
      />
      <TextField
        label="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="text-field"
      />

      <TextField
        label="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(parseInt(e.target.value))}
        className="text-field"
      />
      <TextField
        label="Wydawca"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        className="text-field"
      />
      <TextField
        label="Rok publikacji"
        value={publicationYear}
        onChange={(e) => setPublicationYear(parseInt(e.target.value))}
        className="text-field"
      />
      <TextField
        label="Dostępność"
        value={availableCopies}
        onChange={(e) => setAvailableCopies(parseInt(e.target.value))}
        className="text-field"
      />
      <Button type="submit" variant="contained" className="submit-button">
        Add book
      </Button>
      <Button
        variant="contained"
        component={Link}
        to="/home/books"
        sx={{ m: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default AddBook;
