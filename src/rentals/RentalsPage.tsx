import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import RentalList from '../rental-list/RentalList';
import React, { useEffect, useState } from 'react';
import { GetRentalDto } from '../api/dto/rental.dto';
import { useApi } from '../api/ApiProvider';
import './RentalsPage.css';

function RentalsPage() {
  const [rentals, setRentals] = useState<GetRentalDto[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    apiClient.getAllRentals().then((data) => {
      // Zmieniono na getAllRentals
      if (data.data) {
        setRentals(data.data);
      }
    });
  }, [apiClient]);

  const handleRefresh = () => {
    apiClient.getAllRentals().then((data) => {
      // Zmieniono na getAllRentals
      if (data.data) {
        setRentals(data.data);
      }
    });
  };

  return (
    <Box className="main-content">
      <Box className="left-content">
        <Box className="operations-buttons">
          <Button variant="contained" component={Link} to="add" sx={{ m: 1 }}>
            Add rental
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="delete"
            sx={{ m: 1 }}
          >
            Delete rental
          </Button>
          <Button variant="contained" onClick={handleRefresh} sx={{ m: 1 }}>
            Refresh
          </Button>
        </Box>
        <RentalList rentals={rentals} />
      </Box>
      <Box className="right-content">
        <Outlet />
      </Box>
    </Box>
  );
}

export default RentalsPage;
