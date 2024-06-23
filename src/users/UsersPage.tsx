import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import UserList from '../users-list/UsersList';
import React, { useEffect, useState } from 'react';
import { GetUserDto } from '../api/dto/user.dto';
import { useApi } from '../api/ApiProvider';
import './UsersPage.css';
import Warning from '../warning/Warning'; // Import komponentu Warning

function UsersPage() {
  const [users, setUsers] = useState<GetUserDto[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [showWarning, setShowWarning] = useState(false); // Nowy stan do kontrolowania widoczności Warning
  const [warningMessage, setWarningMessage] = useState(''); // Nowy stan do przechowywania treści ostrzeżenia
  const apiClient = useApi();

  useEffect(() => {
    handleRefresh(); // Uruchom na początku, aby pobrać listę użytkowników
  }, [apiClient]);

  const handleRefresh = () => {
    apiClient
      .getAllUsers()
      .then((response) => {
        if (response.statusCode === 200 && response.data) {
          setUsers(response.data);
        } else if (response.statusCode === 403) {
          setWarningMessage('Dostęp wygasł. Zaloguj się ponownie.');
          setShowWarning(true);
        } else {
          console.error('Unexpected response status:', response.statusCode);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setWarningMessage('Wystąpił błąd. Spróbuj ponownie później.');
        setShowWarning(true);
      });
  };

  const handleDelete = async () => {
    const deletePromises = checked.map((id) => apiClient.deleteUser(id));
    const results = await Promise.all(deletePromises);
    setChecked([]);

    // Sprawdź każdy wynik
    results.forEach((result, index) => {
      if (!result.success && result.statusCode === 409) {
        setWarningMessage(
          `Nie udało się usunąć użytkownika o ID ${checked[index]}. Najpierw usuń dane wykorzystujące tego użytkownika.`,
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
            Add user
          </Button>
          <Button variant="contained" onClick={handleDelete} sx={{ m: 1 }}>
            Delete user
          </Button>
          <Button variant="contained" onClick={handleRefresh} sx={{ m: 1 }}>
            Refresh
          </Button>
        </Box>
        <UserList users={users} checked={checked} setChecked={setChecked} />
      </Box>
      <Box className="right-content">
        {showWarning && (
          <Warning
            message={warningMessage}
            path="/home/users"
            onClose={handleWarningClose}
          />
        )}
        <Outlet />
      </Box>
    </Box>
  );
}

export default UsersPage;
