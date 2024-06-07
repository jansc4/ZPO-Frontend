import React, { useState } from 'react';
import { List, ListItem, Checkbox, ListSubheader } from '@mui/material';
import User from '../user/User';
import './UsersList.css';
import { GetUserDto } from '../api/dto/user.dto';

interface UserListProps {
  users: GetUserDto[];
}

function UserList({ users }: UserListProps) {
  const [checked, setChecked] = useState<number[]>([]);

  const handleToggle = (index: number) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="user-list-container">
      {' '}
      {/* Załóżmy, że masz odpowiednie klasy CSS */}
      <List
        className="user-list"
        subheader={
          <ListSubheader component="div" className="user-list-header">
            User List
          </ListSubheader>
        }
      >
        {users.map((user, index) => (
          <ListItem key={index} dense button onClick={handleToggle(index)}>
            <Checkbox
              edge="start"
              checked={checked.indexOf(index) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }}
            />
            <div className="user-list-item">
              {' '}
              <User
                userId={user.userId || 0}
                userName={user.userName || ''}
                role={user.role || ''}
                email={user.email || ''}
                name={user.name || ''}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
