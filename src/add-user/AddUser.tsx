import React, { FormEvent, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import './AddUser.css';
import { Link, useNavigate } from 'react-router-dom';

class RegisterDto {
  password: string | undefined;
  userName: string | undefined;
  role: string | undefined;
  email: string | undefined;
}

function AddUser() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const api = useApi();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = new RegisterDto();
    user.userName = userName;
    user.email = email;
    user.role = role;
    user.password = password;

    api.registerUser(user).then(() => {
      navigate('/home/users');
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="add-user">
      <TextField
        label="Nazwa użytkownika"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="text-field"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-field"
      />
      <TextField
        label="Imię i nazwisko"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-field"
      />
      <TextField
        label="Hasło"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="text-field"
      />
      <TextField
        label="Rola"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="text-field"
      />
      <Button type="submit" variant="contained" className="submit-button">
        Add user
      </Button>
      <Button
        variant="contained"
        component={Link}
        to="/home/users"
        sx={{ m: 1 }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default AddUser;
