import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import UserList from '../users-list/UsersList';
import React, { useEffect, useState } from 'react';
import { GetUserDto } from '../api/dto/user.dto';
import { useApi } from '../api/ApiProvider';
import './UsersPage.css';

function UsersPage() {
  const [users, setUsers] = useState<GetUserDto[]>([]);
  const apiClient = useApi();

  useEffect(() => {
    apiClient.getAllUsers().then((data) => {
      if (data.data) {
        setUsers(data.data);
      }
    });
  }, [apiClient]);

  const handleRefresh = () => {
    apiClient.getAllUsers().then((data) => {
      if (data.data) {
        setUsers(data.data);
      }
    });
  };

  return (
    <Box className="main-content">
      <Box className="left-content">
        <Box className="operations-buttons">
          <Button variant="contained" component={Link} to="add" sx={{ m: 1 }}>
            Add user
          </Button>
          <Button variant="contained" onClick={handleRefresh} sx={{ m: 1 }}>
            Refresh
          </Button>
        </Box>
        <UserList users={users} />
      </Box>
      <Box className="right-content">
        <Outlet />
      </Box>
    </Box>
  );
}

export default UsersPage;
