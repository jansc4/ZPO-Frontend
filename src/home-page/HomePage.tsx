import { Box, Button } from '@mui/material';
import MenuAppBar from '../app-bar/MenuAppBar';
import { Link, Outlet } from 'react-router-dom';
import BookList from '../book-list/BookList';

function HomePage() {
  const books = [
    { title: 'Harry Potter', author: 'J.K. Rowling', year: 1997 },
    { title: 'Lord of the Rings', author: 'J.R.R. Tolkien', year: 1954 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MenuAppBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <Button variant="contained" component={Link} to="1" sx={{ m: 1 }}>
            Route 1
          </Button>
          <Button variant="contained" component={Link} to="2" sx={{ m: 1 }}>
            Route 2
          </Button>
        </Box>
        <BookList books={books} />
      </Box>
      <Outlet />
    </Box>
  );
}

export default HomePage;
