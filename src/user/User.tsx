import React from 'react';
import { Typography } from '@mui/material';
import './User.css';

interface UserElementProps {
  userId: number;
  userName: string;
  role: string;
  email: string;
  name: string;
}

function User(props: UserElementProps) {
  const { userId, userName, role, email, name } = props;
  return (
    <div className="user-container">
      <div className="user-main-data">
        <Typography className="user-name" variant="subtitle1" gutterBottom>
          {name}
        </Typography>
        <Typography
          className="user-username"
          variant="body2"
          color="textSecondary"
        >
          User ID: {userId} - Username: {userName}
        </Typography>
      </div>
      <hr className="divider" />
      <div className="user-secondary-data">
        <Typography className="user-role" variant="body1" color="white">
          Role: {role}
        </Typography>
        <Typography
          className="user-email"
          variant="body2"
          color="textSecondary"
        >
          Email: {email}
        </Typography>
      </div>
    </div>
  );
}

export default User;
