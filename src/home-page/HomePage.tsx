import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import MenuAppBar from '../app-bar/MenuAppBar';
import BookList from '../book-list/BookList';
import { useApi } from '../api/ApiProvider';
import { GetBookDto } from '../api/dto/book.dto';
import './HomePage.css';

function HomePage() {
  const [books, setBooks] = useState<GetBookDto[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    apiClient.getAllBooks().then((data) => {
      if (data.data) {
        setBooks(data.data);
      }
    });
  }, [apiClient]);

  const handleRefresh = () => {
    apiClient.getAllBooks().then((data) => {
      if (data.data) {
        setBooks(data.data);
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box className="main-content">
        <Box className="left-content">
          <Box className="operations-buttons">
            <Button variant="contained" component={Link} to="add" sx={{ m: 1 }}>
              Add book
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="delete"
              sx={{ m: 1 }}
            >
              Delete book
            </Button>
            <Button variant="contained" onClick={handleRefresh} sx={{ m: 1 }}>
              Refresh
            </Button>
          </Box>
          <BookList books={books} />
        </Box>
        <Box className="right-content">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
