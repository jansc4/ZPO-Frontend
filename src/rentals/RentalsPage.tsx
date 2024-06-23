import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import RentalList from '../rental-list/RentalList';
import React, { useEffect, useState } from 'react';
import { GetRentalDto } from '../api/dto/rental.dto';
import { useApi } from '../api/ApiProvider';
import './RentalsPage.css';
import Warning from '../warning/Warning'; // Import komponentu Warning

function RentalsPage() {
  const [rentals, setRentals] = useState<GetRentalDto[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [showWarning, setShowWarning] = useState(false); // Nowy stan do kontrolowania widoczności Warning
  const [warningMessage, setWarningMessage] = useState(''); // Nowy stan do przechowywania treści ostrzeżenia
  const apiClient = useApi();

  useEffect(() => {
    handleRefresh(); // Uruchamiając na początku, aby pobrać listę wypożyczeń
  }, [apiClient]);

  const handleRefresh = () => {
    apiClient
      .getAllRentals()
      .then((response) => {
        if (response.statusCode === 200 && response.data) {
          setRentals(response.data);
        } else if (response.statusCode === 403) {
          //console.log('błąd');
          setWarningMessage('Dostęp wygasł. Zaloguj się ponownie.');
          setShowWarning(true);
        } else {
          console.error('Unexpected response status:', response.statusCode);
        }
      })
      .catch((error) => {
        console.error('Error fetching rentals:', error);
        setWarningMessage('Wystąpił błąd. Spróbuj ponownie później.');
        setShowWarning(true);
      });
  };

  const handleDelete = async () => {
    const deletePromises = checked.map((id) => apiClient.deleteRental(id));
    await Promise.all(deletePromises);
    setChecked([]);
    handleRefresh(); // Odśwież listę po usunięciu
  };
  // const handleReturnBook = async () => {
  //   const returnPromises = checked.map((id) =>
  //     apiClient.returnBook({ loanId: id, returnDate: new Date() }),
  //   );
  //   await Promise.all(returnPromises);
  //   setChecked([]);
  //   handleRefresh(); // Odśwież listę po zwrocie książek
  // };

  const handleToggle = (id: number) => {
    setChecked((prev) => {
      if (prev.includes(id)) {
        return prev.filter((checkedId) => checkedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleWarningClose = () => {
    setShowWarning(false); // Zamknij komponent Warning
  };

  return (
    <Box className="main-content">
      <Box className="left-content">
        <Box className="operations-buttons">
          <Button variant="contained" component={Link} to="add" sx={{ m: 1 }}>
            Add rental
          </Button>
          <Button variant="contained" onClick={handleDelete} sx={{ m: 1 }}>
            Delete rental
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="return"
            sx={{ m: 1 }}
          >
            Return book
          </Button>
          <Button variant="contained" onClick={handleRefresh} sx={{ m: 1 }}>
            Refresh
          </Button>
        </Box>
        <RentalList
          rentals={rentals}
          checked={checked}
          onToggle={handleToggle}
        />
      </Box>
      <Box className="right-content">
        {showWarning && (
          <Warning
            message={warningMessage}
            path="/home/loans"
            onClose={handleWarningClose}
          />
        )}
        <Outlet />
      </Box>
    </Box>
  );
}

export default RentalsPage;
