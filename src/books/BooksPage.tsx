import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import BookList from '../book-list/BookList';
import React, { useEffect, useState } from 'react';
import { GetBookDto } from '../api/dto/book.dto';
import { useApi } from '../api/ApiProvider';
import './BooksPage.css';
import Warning from '../warning/Warning'; // Import komponentu Warning

function BooksPage() {
  const [books, setBooks] = useState<GetBookDto[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [showWarning, setShowWarning] = useState(false); // Nowy stan do kontrolowania widoczności Warning
  const [warningMessage, setWarningMessage] = useState(''); // Nowy stan do przechowywania treści ostrzeżenia
  const apiClient = useApi();

  useEffect(() => {
    handleRefresh(); // Uruchom na początku, aby pobrać listę książek
  }, [apiClient]);

  const handleRefresh = () => {
    apiClient
      .getAllBooks()
      .then((response) => {
        if (response.statusCode === 200 && response.data) {
          setBooks(response.data);
        } else if (response.statusCode === 403) {
          setWarningMessage('Dostęp wygasł. Zaloguj się ponownie.');
          setShowWarning(true);
        } else {
          console.error('Unexpected response status:', response.statusCode);
        }
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setWarningMessage('Wystąpił błąd. Spróbuj ponownie później.');
        setShowWarning(true);
      });
  };

  const handleDelete = async () => {
    const deletePromises = checked.map((id) => apiClient.deleteBook(id));
    const results = await Promise.all(deletePromises);
    setChecked([]);

    // Sprawdź każdy wynik
    results.forEach((result, index) => {
      if (!result.success && result.statusCode === 409) {
        setWarningMessage(
          `Nie udało się usunąć książki o ID ${checked[index]}. Najpierw usuń dane wykorzystujące te książkę.`,
        );
        setShowWarning(true);
      }
    });

    handleRefresh();
  };

  const handleWarningClose = () => {
    setShowWarning(false); // Zamknij komponent Warning
  };

  return (
    <Box className="main-content">
      <Box className="left-content">
        <Box className="operations-buttons">
          <Button variant="contained" component={Link} to="add" sx={{ m: 1 }}>
            Add book
          </Button>
          <Button variant="contained" onClick={handleDelete} sx={{ m: 1 }}>
            Delete book
          </Button>
          <Button variant="contained" onClick={handleRefresh} sx={{ m: 1 }}>
            Refresh
          </Button>
        </Box>
        <BookList books={books} checked={checked} setChecked={setChecked} />
      </Box>
      <Box className="right-content">
        {showWarning && (
          <Warning
            message={warningMessage}
            path="/home/books"
            onClose={handleWarningClose}
          />
        )}
        <Outlet />
      </Box>
    </Box>
  );
}

export default BooksPage;
